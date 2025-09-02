import React, { useState } from 'react'
import AdminContext from './AdminContext.js'
import {toast} from 'react-toastify'
import axios from 'axios'
const AdminContextProvider = ({children}) => {
  const[aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
  const[doctors,setDoctors]=useState([])
  const[appointments,setAppointments]=useState([])
  const[dashData,setdashData]=useState(false)
  const backendUrl='http://localhost:4000'
  const getAllDoctors=async()=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
      if(data.success) {
        setDoctors(data.doctors)
      }
      else {
        toast.error(data.message)
      }
    }
    catch(error) {
      toast.error(error.message)
    }
  }
  const changeAvailability=async(docId)=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
      if(data.success) {
        toast.success(data.message)
        getAllDoctors()
      }
      else {
        toast.success(data.message)
      }
    }
    catch(error) {
      console.log(error)
      toast.error(error.message)
    }

  }
  const getAllAppointments=async(req,res)=>{
      try{
        const{data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
        if(data.success) {
          setAppointments(data.appointments)
          console.log(data.appointments)
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
  const cancelappointment=async(appointmentId)=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
      if(data.success) {
        toast.success(data.message)
        getAllAppointments()
      }
      else {
        toast.error(error.message)
      }
    }
    catch(error) {
      console.log(error)
    toast.error(error.message)
    }
  }
  const getdashdata=async(req,res)=>{
    try{
      const{data}=await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
      if(data.success) {
        setdashData(data.dashData)
      }
      else {
        toast.error(error.message)
      }
    }
    catch(error) {
      console.log(error)
    toast.error(error.message)
    }
  }
  const deletedoctor=async(doctorId)=>{
    try{
      const{data}=await axios.post(backendUrl+'/api/admin/delete-doctor',{doctorId},{headers:{aToken}});
      if(data.success) {
        toast.success(data.message)
        getAllDoctors()
      }
      else {
        toast.error(data.message)
      }
    }
    catch(error) {
      toast.error(error.message)
    }
  }
  const value={
    aToken,setAToken,backendUrl,doctors,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelappointment,dashData,getdashdata,deletedoctor
  }
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
