import express from 'express';
import initApp from './src/modules/app.roter.js';
const app = express();
initApp(app,express);
app.listen(3000,()=>{
    console.log('server is working now...')
});