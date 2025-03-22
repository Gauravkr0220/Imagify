import { createContext } from "react";
import { useState } from "react";
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [user,setUser]=useState(false);
    const[showLogin,setShowLogin]=useState(null);
    // setShowLogin used in lign and crom of login to s=change the state of login page and show login on appjsx to show login or not
    const value={
        user,setUser,showLogin,setShowLogin
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default  AppContextProvider