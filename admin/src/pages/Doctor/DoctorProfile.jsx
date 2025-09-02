import React, { useContext, useEffect, useState } from 'react'
import DoctorContext from '../../context/DoctorContext'
import axios from 'axios'
import {toast} from 'react-toastify'
const DoctorProfile = () => {
  const{dToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
  const[isEdit,setisEdit]=useState(false)
  const updateProfile=async(req,res)=>{
    try{
      const updateData={
        address:profileData.address,
        experience:profileData.experience,
        degree:profileData.degree,
        fees:profileData.fees,
        available:profileData.available,
        about:profileData.about
      }
      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success) {
        toast.success(data.message)
        setisEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }
    }
    catch(error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(dToken) {
      getProfileData()
    }
  },[dToken])
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img src={profileData.image} className='bg-[#5F6FFF] w-full sm:max-w-64 rounded-lg'></img>
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{ isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,degree:e.target.value}))} value={profileData.degree}/>:profileData.degree} - { isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,speciality:e.target.value}))} value={profileData.speciality}/>: profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{isEdit?<input type='number' onChange={(e)=>setProfileData(prev=>({...prev,experience:e.target.value}))} value={profileData.experience}/>:profileData.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,about:e.target.value}))} value={profileData.about}/>:profileData.about}</p>
          </div>
          <p  className='text-gray-600 font-medium mt-4'>Appointment Fees:<span className='text-gray-800'>{ isEdit?<input type='number' onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/>:profileData.fees}</span></p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>{isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/>:profileData.address.line1}
            <br/>
            {isEdit?<input type='text' onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/>:profileData.address.line2}
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input
  type="checkbox"
  checked={profileData.available}
  disabled={!isEdit}
  onChange={(e) => setProfileData(prev => ({ ...prev, available: e.target.checked }))}
/>

            <label htmlFor=''>{profileData.available?"Available":"Unavailable"}</label>
          </div>
          {
            isEdit
            ?
            <button onClick={updateProfile} className='px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] hover:text-white transition-all cursor-pointer'>Save</button>
            :
            <button  onClick={()=>setisEdit(true)} className='px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-5 hover:bg-[#5F6FFF] hover:text-white transition-all cursor-pointer'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
