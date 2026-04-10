import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d"});
}
///route for user login 
const loginUser = async( req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if (!user){
            return res.json({success:false, message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.json({success:false, message:"Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true, message:"User logged in successfully", token});
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Error logging in user" });
    }
    
     
}

//route for user register
const registerUser = async (req,res)=>{
   try{
    const {name,email,password} = req.body;
      //checking if user already exists or not
      const exists = await userModel.findOne({email});  
      if (exists){
        return res.json({success:false, message:"User already exists"});
      }  
      //validating email formate and strong password 
      if (!validator.isEmail(email)){
        return res.json({success:false, message:"Invalid email"});
      }      
      if (password.length<8){
        return res.json({success:false, message:"Password must be at least 8 characters long"});
      }      
      //hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);  
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword
      });
      
      const user = await newUser.save();
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
      res.json({success:true, message:"User registered successfully", token});


   }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Error registering user" });
        
   }    
}
//royes for admin login 
const adminLogin = async (req,res)=>{
    try{
      const {email,password}=req.body;
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true, message:"Admin logged in successfully", token});
      }else{
        res.json({success:false, message:"Invalid admin credentials"});
      }

    }catch(error){
        console.error("Error logging in as admin:", error);
        res.status(500).json({ message: "Error logging in as admin", error: error.message });
    }

}

export {loginUser,registerUser,adminLogin};
