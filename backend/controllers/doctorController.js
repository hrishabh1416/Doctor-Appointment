import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
const changeAvailability=async(req,res)=>{
    try{
        const {docId}=req.body;
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:"Availablility changed"})
}
catch(error) {
    console.log(error)
    res.json({success:false,message:error.message})
}
}
const doctorList=async(req,res)=>{
    try{
        const doctor=await doctorModel.find({}).select('-password')
        res.json({success:true,doctor})
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const logindoctor=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const doctor=await doctorModel.findOne({email})
        const ismmatch=await bcrypt.compare(password,doctor.password);
        if(!ismmatch) {
            return res.json({success:false,message:"Please enter correct password or id"})
        }
        const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET);
        return res.json({ success: true, token });

    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const appointmentsDoctor=async(req,res)=>{
    try{
        const docId=req.docId;
        const appointments=await appointmentModel.find({docId});
        res.json({success:true,appointments})
    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const appointmentcomplete = async (req, res) => {
    try {
      const {appointmentId } = req.body;
      const docId=req.docId;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (appointmentData && appointmentData.docId === docId) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        return res.json({ success: true, message: "Appointment Confirmed" });
      } else {
        return res.json({ success: false, message: "Appointment Failed" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  const appointmentcancell = async (req, res) => {
    try {
      const {appointmentId } = req.body;
      const docId=req.docId;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (appointmentData && appointmentData.docId === docId.toString()) {
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        return res.json({ success: true, message: "Appointment Cancelled" });
      } else {
        return res.json({ success: false, message: "Cancellation Failed" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };  
  const doctordashboard=async(req,res)=>{
    try{
      const docId=req.docId;
      const appointments=await appointmentModel.find({docId})
      let earnings=0
      appointments.map((item)=>{
        if(item.isCompleted||item.payment) {
          earnings+=item.amount
        }
      })
      let patients=[]
      appointments.map((item)=>{
        if(!patients.includes(item.userId)) {
          patients.push(item.userId)
        }
      })
      const dashData  = {
        earnings,
        appointments:appointments.length,
        patients:patients.length,
        latestappointments:appointments.reverse()
      }
      res.json({success:true,dashData})
    }
    catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
  const doctorprofile=async(req,res)=>{
    try{
      const docId=req.docId;
      const profileData=await doctorModel.findById(docId).select('-password')
      res.json({success:true,profileData})
    }
    catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
const updateDoctorProfile=async(req,res)=>{
  try{
    const{fees,address,available, degree, experience, about}=req.body;
    const docId=req.docId;
    await doctorModel.findByIdAndUpdate(docId,{fees,address,available, degree, experience, about})
    res.json({success:true,message:"Profile Updated"})
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {changeAvailability,doctorList,logindoctor,appointmentsDoctor,appointmentcomplete,appointmentcancell,doctordashboard,doctorprofile,updateDoctorProfile}