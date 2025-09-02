import React, { useContext, useEffect } from 'react'
import AdminContext from '../../context/AdminContext'
const DoctorsList = () => {
  const{doctors,aToken,getAllDoctors,changeAvailability,deletedoctor}=useContext(AdminContext)
  useEffect(()=>{
    if(aToken) {
      getAllDoctors()
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
              <img src={item.image} className='bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-500'></img>
              <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>  
              <p>{item.email}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input type='checkbox' checked={item.available} onChange={()=>changeAvailability(item._id)}></input>
                <p>{item.available ? "Available " : "Not Available "}</p>
              </div>
              <button onClick={()=>deletedoctor(item._id)}  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer">Delete doctor</button>
              </div>
            </div>
          ))
          }
      </div>
    </div>
  )
}

export default DoctorsList
