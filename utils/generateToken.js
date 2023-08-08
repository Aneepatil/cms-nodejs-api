import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const generateToken=(id)=>{
 return jwt.sign({id},process.env.JWT_SEC_KEY,{expiresIn:'7d'})
}