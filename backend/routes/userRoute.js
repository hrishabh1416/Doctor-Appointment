import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listappointment, cancelappointment, paymentRazorpay,verifyPayment} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listappointment)
userRouter.post('/cancel-appointment',authUser,cancelappointment)
userRouter.post('/payment',authUser,paymentRazorpay)
userRouter.post('/verify-payment', authUser, verifyPayment)
export default userRouter;