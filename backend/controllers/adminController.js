import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
const adddoctor=async(req,res)=>{
    try{
        const{name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file;
        console.log(name,email,password,speciality,degree,experience,about,fees,address,imageFile)
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address||!imageFile) {
            return res.json({success:false,message:" Missing Details"})
        }
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"});
        }
        if(password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const imageupload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl=imageupload.secure_url;
        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor=new doctorModel(doctorData);
        await newDoctor.save()
        res.json({success:true,message:"Doctor added Successfully"})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const adminlogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({ email }, process.env.JWT_SECRET)
            return res.json({success:true,token,message:"Login Successfull"})
        }
        else {
            res.json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const allDoctors=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const appointmentsAdmin=async(req,res)=>{
    try{
        const appointments=await  appointmentModel.find({});
        res.json({success:true,appointments})
        
console.log("Appointments Response:", appointments);
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const cancelappointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        if (doctorData.slots_booked[slotDate]) {
            doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(e => e !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, { slots_booked: doctorData.slots_booked });
        }

        res.json({ success: true, message: "Appointment cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const admindashboard=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestappointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    }
    catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}
const deletedoctor=async(req,res)=>{
    try{
    const{doctorId}=req.body;
    if(!doctorId) {
        res.json({success:false,message:"Doctor Id is required"})
    }
    const doctor=await doctorModel.findById(doctorId)
    if(!doctor) {
        res.json({success:false,message:"Doctor is not present"})
    }
    await doctorModel.findByIdAndDelete(doctorId)
    res.json({success:true,message:"Doctor successfully deleted"})
}
catch(error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}

export {adddoctor,adminlogin,allDoctors,appointmentsAdmin,cancelappointment,admindashboard,deletedoctor}