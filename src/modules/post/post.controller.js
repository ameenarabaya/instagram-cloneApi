import postModel from "../../../DB/models/postModel.js";
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/models/userModel.js";
import cloudinary from "../../utility/middleware/cloudinary.js";


export const addPost = async(req,res)=>{
  const {secure_url}=await cloudinary.uploader.upload(req.file.path);
const description = req.body.description;
let {token} = req.headers;
const decode =  jwt.verify(token,"LOGIN");
const id = decode._id;
const user = await userModel.findById({_id:id}).select('userName avatar');
const post =  await postModel.create({image:secure_url,description,user,UserId:id});
const user2 = await userModel.findByIdAndUpdate({_id:id},{ $push: { posts:post}});
return res.json({message:"success",post:post})
}

export const getPostofUser = async(req,res)=>{
  let {id} = req.params;
  const posts =  await postModel.find({UserId:id});
  return res.json({posts:posts})
}

export const addLike = async(req,res)=>{
    try{
    let {token} = req.headers;
    let {id} = req.params;
    const decode =  jwt.verify(token,"LOGIN");
    const userid = decode._id;
    const user = await userModel.findById({_id:userid});
    const TruePost =await postModel.findOne({_id:id});
    if(TruePost.likes.indexOf(userid) == -1){
        const post = await postModel.findByIdAndUpdate({_id:id},{ $push: {likes:user}},{new:true});
        return res.json({post})
    } else {
        const post = await postModel.findByIdAndUpdate({_id:id},{ $pull: {likes: userid } },{new:true});
        return res.json({post})
    }
} catch(error){
    return res.json(error.stack)
}
  }


  export const getLikesOfPost = async(req,res)=>{
    let {id} = req.params;
    const post = await postModel.findById({_id:id}).populate('likes').exec();
    return res.json({likes:{users:post.likes},count:post.likes.length});
  }

  export const updateDescription = async(req,res)=>{
    const {description} = req.body;
    let {id} = req.params;
    const {token} = req.headers;
    const decode =  jwt.verify(token,"LOGIN");
    const userid = decode._id;
    if(userid){
    const post = await postModel.updateOne({_id:id},{description})
    return res.json({message: "Post updated successfully"});
} return res.json({message:"you are not autharized"})
  }


  export const deletePost = async(req,res)=>{
    let {id} = req.params; 
    const {token} = req.headers;
    const decode =  jwt.verify(token,"LOGIN");
    const userid = decode._id;
    if(userid){
    const post = await postModel.deleteOne({_id:id});
    return res.json({message: "Post deleted successfully"});
} return res.json({message:"you are not autharized"})
  }

  export const getAllPost =async(req,res)=>{
    const {token} = req.headers;
    const decode =  jwt.verify(token,"LOGIN");
    const userid = decode._id;
    if(userid){
    const post = await postModel.find().populate('user');
    return res.json({posts:post});
} return res.json({message:"you are not autharized"})
  }


  export const upload = (req,res)=>{
    try{
      let file = req.file;
      let userName = req.body.userName;
      return res.json({message:"success",file,userName});
    } catch(error){
      return res.json(error.stack);
    }
  }