import React, { useContext, useEffect, useState } from 'react';
import DoctorContext from '../context/Doctorcontext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
function MyAppointments() {
  const {backendUrl,token}=useContext(DoctorContext);
  const[appointments,setAppointments]=useState([]);
  const navigate=useNavigate();
  const getUserAppointments=async()=>{
    try{
      const {data}=await  axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    }
    catch(error) {
      console.log(error)

    }
  }
  const cancelappointment=async(appointmentId)=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success) {
        toast.success(data.message)
        getUserAppointments()
      }
      else {
        toast.error(data.message)
      }
    }
    catch(error) {
      console.log(error)

    }
  }
  const initPay=(order)=>{
    const options={
      key:"rzp_test_RA25nnynD7Wu1v",
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        try {
          const{data}=await axios.post(backendUrl + "/api/user/verify-payment",response,{headers:{token}})
          if(data.success) {
            getUserAppointments()
            navigate('/myappointments')
          }
        } catch (err) {
          toast.error("Payment verification failed");
          console.log(err)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay=async(appointmentId)=>{
    try{
    const{data}=await axios.post(backendUrl+'/api/user/payment',{appointmentId},{headers:{token}})
    if(data.success) {
      toast.success(data.message)
      console.log(data.order)
      initPay(data.order)
    }
  }
  catch(error) {
    console.log(error)

  }
}
  useEffect(()=>{
    if(token) {
      getUserAppointments()
    }
  },[token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b text-2xl'>My Appointments</p>
      <div>
        {appointments.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
              <div>
              <img src={item.docData.image} className='w-32 bg-indigo-50'></img>
              </div>
              <div className='flex-1 text-xl text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date and Time : </span>{item.slotDate} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled&&item.payment&&!item.isCompleted&&(<button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Paid</button>)}
              {!item.cancelled&&!item.payment&&!item.isCompleted&&(<button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border-rounded cursor-pointer hover:bg-[#5F6FFF] hover:text-white transition-all' onClick={()=>appointmentRazorpay(item._id)}>Pay Online</button>)}
              {!item.cancelled&&!item.payment&&!item.isCompleted&&(<button  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border-rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all' onClick={()=>cancelappointment(item._id)}>Cancel Appointment</button>)}
              {item.cancelled&&!item.payment&&!item.isCompleted&&(<button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>)}
              {item.isCompleted&&(<button className='sm:min-w-48 py-2 border border-blue-500 rounded text-blue-500'>Completed</button>)}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
