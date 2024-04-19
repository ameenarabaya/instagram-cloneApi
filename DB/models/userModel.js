import { Schema, model } from "mongoose";

const userSchema = new Schema({
    avatar:{
type:String,
default:"https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
    },
userName:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true,
    unique:true,
},
bio:{
    type:String,
    default:""
},
status:{
type:String,
enum:["public","private"],
default:"public"
},
password:{
    type:String,
    require:true
},
posts:[{ type: Schema.Types.ObjectId, ref: 'Post'}],
Comments:{
    type:Array,
    default:[]
},
token:{
    type:String
},

})

const userModel = model('User',userSchema);
export default userModel;