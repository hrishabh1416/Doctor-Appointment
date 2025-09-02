import React, { useContext, useEffect } from 'react'
import DoctorContext from '../../context/DoctorContext'
import {assets} from '../../assets/assets_admin/assets'
const DoctorDashboard = () => {
  const {dToken,dashData,setDashData,getDashData,completeappointment,canceleappointment}=useContext(DoctorContext)
  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-32 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.earning_icon} className='w-14'></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>₹{dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div  className='flex items-center gap-2 bg-white p-4 min-w-32 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointments_icon} className='w-14'></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p  className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div  className='flex items-center gap-2 bg-white p-4 min-w-32 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} className='w-14'></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon}></img>
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestappointments.map((item,index)=> (
                <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                <img src={item.userData.image} className='rounded-full w-10'></img>
                <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>{item.slotDate}</p>
                </div>
                {
                item.cancelled
                ?
                <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                :
                item.isCompleted
                ?<p className='text-green-500 text-xs font-medium'>Completed</p>
                :
              
              <div className='flex'>
                <img src={assets.cancel_icon} className='w-10 cursor-pointer' onClick={()=>canceleappointment(item._id)}></img>
                <img src={assets.tick_icon} className='w-10 cursor-pointer' onClick={()=>completeappointment(item._id)}></img>
              </div>
}
                </div>
            ))
          }
        </div>
      </div>
      </div>
  )
}

export default DoctorDashboard
