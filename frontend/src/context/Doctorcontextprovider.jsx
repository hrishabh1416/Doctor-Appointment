import React, { useEffect, useState } from 'react';
import DoctorContext from './Doctorcontext'
import {doctors} from '../assets/assets_frontend/assets';
import axios from 'axios'
import {toast} from 'react-toastify'
function Doctorcontextprovider({children}) {
  const[doctor,setdoctor]=useState([])
  const backendUrl='http://localhost:4000'
  const currencySymbol='₹';
  const[token,setToken]=useState('')
  const[userdata,setuserdata]=useState(false)
  const getDoctorsData=async()=>{
    try{
      const{data}=await axios.get(backendUrl+'/api/doctor/list')
      if(data.success) {
        setdoctor(data.doctor)
        toast.success("Data loaded from database")
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
  const loadUserProfileData=async()=>{
    try{
      const{data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
      if(data.success) {
        setuserdata(data.userData)
        toast.success("Profile Loaded")
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
  const updateUserProfile=async(formData)=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token,"Content-Type": "multipart/form-data"}});
      if(data.success) {
        toast.success("Profile Updates")
        loadUserProfileData();
        return true;
      }
      else {
        toast.error(data.message)
        return false;
      }
    }
    catch(error) {
      console.log(error)
      toast.error(error.message)
      return false;
    }
  }
  useEffect(()=>{
    setdoctor(doctors),getDoctorsData()
  },[]);
  useEffect(()=>{
    if(token) {
      loadUserProfileData()
    }
    else {
      setuserdata(false)
    }
  },[token]);
  return (
    <DoctorContext.Provider value={{doctor,setdoctor,currencySymbol,token,setToken,backendUrl,userdata,setuserdata,loadUserProfileData,updateUserProfile,getDoctorsData}}>
      {children}
    </DoctorContext.Provider>
  )
}

export default Doctorcontextprovider; 
