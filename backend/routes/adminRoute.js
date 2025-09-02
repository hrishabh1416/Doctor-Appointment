import express from 'express'
import {adddoctor,admindashboard,adminlogin, allDoctors, appointmentsAdmin, cancelappointment, deletedoctor} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
const adminRouter=express.Router();
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),adddoctor)
adminRouter.post('/login',adminlogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelappointment)
adminRouter.get('/dashboard',authAdmin,admindashboard)
adminRouter.post('/delete-doctor',authAdmin,deletedoctor)
export default adminRouter;