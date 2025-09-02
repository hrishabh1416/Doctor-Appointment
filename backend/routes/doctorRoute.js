import express from 'express'
import { appointmentcancell, appointmentcomplete, appointmentsDoctor, doctordashboard, doctorList, doctorprofile, logindoctor, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter=express.Router();
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',logindoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentcancell)
doctorRouter.post('/complete-appointment',authDoctor,appointmentcomplete)
doctorRouter.get('/dashboard',authDoctor,doctordashboard)
doctorRouter.get('/profile',authDoctor,doctorprofile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter