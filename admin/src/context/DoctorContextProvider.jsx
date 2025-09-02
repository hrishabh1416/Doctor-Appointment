import React from 'react'
import { useState } from 'react'
import DoctorContext from '../context/DoctorContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const DoctorContextProvider = ({children}) => {
    const backendUrl='http://localhost:4000'
    const[dToken,setDToken]=useState('')
    const[appointments,setAppointments]=useState([])
    const[dashData,setDashData]=useState(false)
    const[profileData,setProfileData]=useState(false)
    const getAppointments=async()=>{
      try{
        const{data}=await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}})
        if(data.success) {
          setAppointments(data.appointments.reverse());
          console.log(data.appointments)
        }
        else {
          toast.error(data.message)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    const completeappointment=async(appointmentId)=>{
      try{
        const{data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
        if(data.success) {
          toast.success(data.success)
          getAppointments()
        }
        else {
          toast.error(data.message)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    const canceleappointment=async(appointmentId)=>{
      try{
        const{data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
        if(data.success) {
          toast.success(data.success)
          getAppointments()
        }
        else {
          toast.error(data.message)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    const getDashData=async()=>{
      try{
        const{data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
        if(data.success) {
          setDashData(data.dashData)
        }
        else {
          toast.error(data.message)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    const getProfileData=async(req,res)=>{
      try{
        const{data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
        if(data.success) {
          setProfileData(data.profileData)
        }
        else {
          toast.error(data.message)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    const value={dToken,setDToken,backendUrl,appointments,setAppointments,getAppointments,completeappointment,canceleappointment,dashData,setDashData,getDashData,profileData,setProfileData,getProfileData}
  return (
    <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider
