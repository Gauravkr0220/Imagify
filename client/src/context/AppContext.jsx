import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from'axios'
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [user,setUser]=useState(false);
    const[showLogin,setShowLogin]=useState(null);
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const[token,setToken]=useState(localStorage.getItem('token'));
    const [credit,setCredit]=useState(5);
    const navigate=useNavigate()
    // setShowLogin used in lign and crom of login to s=change the state of login page and show login on appjsx to show login or not
    const loadCreditsDate=async()=>{
        try{
            const { data } = await axios.get(backendUrl+'/api/user/credits', { 
                headers: { token} 
            });
            
            if(data.success){
                
                setCredit(data.credits);
                setUser(data.user)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);  // Ensure token is null, not an empty string
        setCredit(5);    // Reset credits (optional)
    
        navigate('/');   // Navigate to home after logout
        toast("Logged out successfully")
    };
    
    const generateImage=async(prompt)=>{
        try{
         const{data}=   await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}});
         if(data.success){
            loadCreditsDate()
            return data.resultImage
         }
         else{
            toast.error(data.message)
            loadCreditsDate()
            if(data.creditBalance===0){
                navigate('/buy')
            }
         }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (token) {
            loadCreditsDate();
        } else {
            setUser(null); // Ensure user is null when no token
        }
    }, [token]);  // Remove `user` from dependencies
     //whenever token is change it will fetch data 
    const value={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsDate,logout,generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default  AppContextProvider