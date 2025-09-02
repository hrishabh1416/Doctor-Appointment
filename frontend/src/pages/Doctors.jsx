import React, { useContext,useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import  DoctorContext from '../context/Doctorcontext'
function Doctors() {
  const {speciality}=useParams();
  console.log(speciality);
  const {doctor}=useContext(DoctorContext)
  const[filter,setshowfilter]=useState('')
  const[filterdoc,setfilterdoc]=useState([]);
  const navigate=useNavigate()
  const applyfilter=()=>{
    if(speciality) {
      setfilterdoc(doctor.filter(doc=>doc.speciality===speciality))
    }
    else {
      setfilterdoc(doctor)
    }
  }
  useEffect(()=>{
    applyfilter()
  },[doctor,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the speciliast doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${filter?'bg-[#5F6FFF] text-white':''}`} onClick={()=>setshowfilter(prev=>!prev)} >Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${filter?'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician'?"bg-indigo-100 text-black":""}`}>General Physician</p>
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist'?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist'?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians'?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist'?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==='Gastoenrologist'?navigate('/doctors'):navigate('/doctors/Gastoenrologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastoenrologist'?"bg-indigo-100 text-black":""}`}>Gastoenrologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterdoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img src={item.image} className='bg-blue-50'></img>
              <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className={`w-2 h-2 rounded-full ${item.available === true || item.available=== "true" ? 'bg-green-500' : 'bg-red-500'}`}></p>
<p className={item.available === true || item.available === "true" ? 'text-green-500' : 'text-red-500'}>
  {item.available === true || item.available === "true" ? 'Available' : 'Unavailable'}
</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
