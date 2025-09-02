import React, { useContext, useEffect,useState } from 'react';
import DoctorContext from '../context/Doctorcontext'
import { useNavigate } from 'react-router';
function RelatedDoctors({speciality,docId}) {
  const {doctor}=useContext(DoctorContext)
  const navigate=useNavigate()
  const[relDoc,setRelDocs]=useState([])
  useEffect(()=>{
    if(doctor.length>0 && speciality) {
      const doctorsData=doctor.filter((doc)=>doc.speciality===speciality && doc._id!=docId);
      setRelDocs(doctorsData)
    }
  },[doctor,docId,speciality])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
    <h1 className='text-3xl font-bold'>Related Doctors</h1>
    <p  className='sm:w-1/3 text-center text-xl'>Simple browse through our extensive list of trusted doctors</p>
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
      {relDoc.slice(0,5).map((item,index)=>(
        <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
        <img src={item.image} className='bg-blue-50'></img>
        <div className='p-4'>
        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
        </div>
        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
        <p className='text-gray-600 text-sm'>{item.speciality}</p>
        </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default RelatedDoctors;
