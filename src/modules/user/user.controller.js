import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../../../DB/models/userModel.js';
import cloudinary from '../../utility/middleware/cloudinary.js';

export const register = async(req,res)=>{
    try{
        let {userName,email,password} = req.body;
        const hashPassword  = await bcrypt.hash(password,8);
        // generate token for the new user
        let user = await userModel.create({userName, email, password:hashPassword});
        const token = jwt.sign({_id : user._id},"LOGIN");
        user =await userModel.findByIdAndUpdate({_id:user._id},{token});
        // const user = await userModel.findByIdAndUpdate({userName, email, password:hashPassword});
        return res.json({massage:"success",token :token});
    } catch(error){
        return res.json(error.stack);
    }
}
export const login = async(req,res)=>{
  
        let {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({message:"invalid email"});
        }
       const check = bcrypt.compare(password,user.password);
       if(!check){
        return res.json({message:"invalid password"});
       } 
return res.json({message:"success",user});
}

export const updateUser = async(req,res)=>{
    try{
        let {token} = req.headers;
        const {secure_url}=await cloudinary.uploader.upload(req.file.path);
        const decode =  jwt.verify(token,"LOGIN");
        const id = decode._id
        let {userName,bio,status} = req.body;
        const user = await userModel.findByIdAndUpdate({_id:id},{avatar:secure_url,userName,bio,status},{new:true});
        return res.json({message:"success",user});
    } catch(error){
        return res.json(error.stack)
    }
}

export const deleteUser = async(req,res)=>{
    try{
        let {token} = req.headers;
        const decode =  jwt.verify(token,"LOGIN");
        const id = decode._id
        const user = await userModel.findByIdAndDelete({_id:id});
        return res.json({message:"success"});
    } catch(error){
        return res.json (error.stack)
    }
  }
  export const getAllUser = async(req,res)=>{
    let  users = await userModel.find().populate('posts');
    return res.json({users:users});
  }

  export const getUserByName = async(req,res)=>{
    let  {userName}=req.params
    // return res.json(userName);
    let searchUser = await userModel.find({userName});
    return res.json({users:searchUser});
  }
  export const getAnUser = async(req,res)=>{
    let {id} = req.params;
    let theUser = await userModel.findOne({_id:id}).populate("posts");
    return res.json({user:theUser})
  }