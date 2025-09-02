import React, { useContext } from 'react';
import DoctorContext from '../context/Doctorcontext'
import { useNavigate } from 'react-router';
function TopDoctors() {
  const navigate=useNavigate();
  const {doctor}=useContext( DoctorContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p  className='sm:w-1/3 text-center text-sm'>Simple browse through our extensive list of trusted doctors</p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'>
        {doctor.slice(0,10).map((item,index)=>(
          <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
          <img src={item.image} className='bg-blue-50'></img>
          <div className='p-4'>
          <div className='flex items-center gap-2 text-sm text-center text-green-500'>
            {/* <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p> */}
            <div className='flex items-center gap-2 text-sm text-center'>
            <p className={`w-2 h-2 rounded-full ${item.available === true || item.available=== "true" ? 'bg-green-500' : 'bg-red-500'}`}></p>
<p className={item.available === true || item.available === "true" ? 'text-green-500' : 'text-red-500'}>
  {item.available === true || item.available === "true" ? 'Available' : 'Unavailable'}
</p>
  
</div>

          </div>
          <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
          <p className='text-gray-600 text-sm'>{item.speciality}</p>
          </div>
          </div>
        ))}
      </div>
      <button  onClick={()=>navigate(`/doctors`)}  className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-[#5F6FFF] hover:text-white'>Explore More...</button>
    </div>
  );
}

export default TopDoctors;
