import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
export const signup=async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body
        if(password!== confirmPassword){
            return res.status(400).json({error:"password doesn't match"})
        } 
        const user=await User.findOne({username})
        
        if(user){
            return res.status(400).json({error:"username already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="male"?boyProfilePic:girlProfilePic
        })
        if(newUser){

            generateTokenAndSetCookie(newUser._id,res)

            await newUser.save()
            
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
         }else{
            res.status(400).json({error:"invalid user data"})
         }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"internal server error"})
    }
} 


export const login= async(req,res)=>{
   try {
    console.log(req.body)
    const {username,password}=req.body
    console.log(password)
    const user=await User.findOne({username})
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const ipPasswordCorrect =await bcrypt.compare(password,user.password)
    if(!ipPasswordCorrect){
        return res.status(400).json({error:"invalid username or password"})

    }
    generateTokenAndSetCookie(user._id,res)
     res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        profilePic:user.profilePic
    })
   } catch (error) {
     console.log(error)
     console.log("error is here")
        return res.status(500).json({error:"internal server error"})
   
   }
}



export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfull"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"internal server error"})
    }
}