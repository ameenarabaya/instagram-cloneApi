import mongoose from 'mongoose';

const connection = async() =>{
  return mongoose.connect(`mongodb+srv://ameenawaleed7:UbxGfQfG1Rxfi849@instagram.rsjnep9.mongodb.net/instagram`).
  then((result)=>console.log('connection success')).
  catch(err=>console.log(err))
}
export default connection;