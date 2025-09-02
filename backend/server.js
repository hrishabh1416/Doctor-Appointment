import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from "dotenv";
import { connectDB } from './config/database.js';
import connectcloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js';
import doctorRouter from  './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js';
const app=express()
dotenv.config();
const port=process.env.PORT||4000;
app.use(express.json());
connectDB();
connectcloudinary();
app.use(cors());
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/', async function(req,res){
    res.send("API WORKING")
})
app.listen(port,function(req,res){
    console.log("API IS WORKING")
})