import jwt from 'jsonwebtoken'

const userAuth =async(req,res,next)=>{
    const{token}=req.headers;
    if(!token){
        return res.json({success:false,message:'Not Authorised Login Again'});

    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id; // userid is save in body userid
        }
        else{
            return res.json({success:false,message:'Not Authorised Login Again'});
        }
        next();// it execute the controller function for credit
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}
export { userAuth};