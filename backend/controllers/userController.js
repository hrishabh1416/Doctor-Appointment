import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import cloudinary from 'cloudinary';
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import razorpay from 'razorpay'
import crypto from "crypto";
const loginUser=async(req,res)=> {
    const{email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user) {
             return res.json({success:false,message:"User not exist"})
        }
        const ismmatch=await bcrypt.compare(password,user.password);

        if(!ismmatch) {
            return res.json({success:false,message:"Please enter correct password or id"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        return res.json({ success: true, token, userId: user._id });
    }
    catch(error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}
const registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        if(!name || !email || !password) {  
            return res.json({success:false,message:"Missing details"})
        }
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exist"});
        }
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8) {
            return res.json({success:false,message:"Please choose a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user=await newuser.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({ success: true, token});

    }
    catch(error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}
const getProfile=async(req,res)=> {
    try{
        const userData=await userModel.findById(req.userId).select('-password')
        return res.json({success:true,userData})
    }
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const updateProfile=async(req,res)=>{
    try{
        const{userId,name,phone,address,dob,gender}=req.body;
        const imageFile=req.file;
        if(!name||!phone||!dob||!address||!gender) {
            return res.json({success:false,message:"Data Missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile) {
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL=imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        return res.json({success:true,message:"Profile Updated"})
    }
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const bookAppointment=async(req,res)=>{
    try{
        const{docId,slotDate,slotTime}=req.body;
        const userId = req.userId;
        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available) {
            return res.json({success:false,message:"Doctor not available"})
        }
        let slots_booked=docData.slots_booked
        if(slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:true,message:'Doctor not available'})
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }
        const newAppointment=new appointmentModel(appointmentData)
        await newAppointment.save()
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment Booked"})
    }
    catch(error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
const listappointment=async(req,res)=>{
    try{
        const userId = req.userId;
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const cancelappointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Not authorized to cancel this appointment" });
        }
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
const razorpayinstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
const verifyPayment = async(req, res) => {
    try {
    const{razorpay_order_id}=req.body;
    const orderInfo=await razorpayinstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==="paid") {
        await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        res.json({success:true,message:"Payment Successfull"})
    }
    else {
        res.json({success:false,message:"Payment failed"})
    }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
const paymentRazorpay=async(req,res)=>{
    try{
    const {appointmentId}=req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(!appointmentData||appointmentData.cancelled) {
        res.json({success:false,message:"Appointment not found or appointment cancelled"})
    }
    const options={
        amount:appointmentData.amount*100,
        currency:process.env.CURRENCY,
        receipt:appointmentId
    }
    const order=await razorpayinstance.orders.create(options)
    res.json({success:true,order})
}
catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listappointment,cancelappointment,paymentRazorpay,verifyPayment}