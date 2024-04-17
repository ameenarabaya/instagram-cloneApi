import connection from "../../DB/connection.js";
import postRouter from './post/post.router.js';
import userRouter from './user/user.router.js';
import cors from 'cors';
const initApp = (app,express)=>{
    connection()
app.use(express.json());
app.use(cors())
app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('*',(req,res)=>{
    res.json({message:'page not found'});
});
}
export default initApp;