import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SEC_KEY,(err,decodedUser)=>{
        if(err){
            return {message:'Invalid token'}
        }else{
            return decodedUser
        }
    })
}