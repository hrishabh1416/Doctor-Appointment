import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets_admin/assets'
import AdminContext from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
  const[docImg,setDocImg]=useState(false)
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[fees,setFees]=useState('')
  const[about,setAbout]=useState('')
  const[speciality,setSpeciality]=useState('')
  const[experience,setExperience]=useState('')
  const[degree,setDegree]=useState('')
  const[address1,setAddress1]=useState('')
  const[address2,setAddress2]=useState('')
  const{backendUrl,aToken}=useContext(AdminContext)
  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      if(!docImg) {
        toast.error("Image not selected")
      }
      const formData=new FormData();
      formData.append('image',docImg),
      formData.append('name',name),
      formData.append('email',email),
      formData.append('password',password),
      formData.append('experience',experience),
      formData.append('fees',fees),
      formData.append('about',about),
      formData.append('speciality',speciality),
      formData.append('degree',degree),
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })
      const{data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}});
      if(data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setSpeciality('')
      }
      else {
        toast.error(data.message)
      }
    }
    catch(error) {
      console.log(error)
    }
  }
  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
      <div>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border-none rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img src={docImg? URL.createObjectURL(docImg):assets.upload_area} className='w-16 bg-gray-100 rounded-full cursor-pointer'></img>
          </label>
          <input type='file' id='doc-img' onChange={(e)=>setDocImg(e.target.files[0])} hidden></input>
          <p>Upload Doctor Picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input type='text' placeholder='Name' className='border rounded px-3 py-2' value={name} onChange={(e)=>setName(e.target.value)} required></input>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input type='text' placeholder='Name' className='border rounded px-3 py-2' value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input type='password' placeholder='Name' className='border rounded px-3 py-2' value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select name='' id='' value={experience} onChange={(e)=>setExperience(e.target.value)}>
                <option value="1 Year">1</option>
                <option value="2 Year">2</option>
                <option value="3 Year">3</option>
                <option value="4 Year">4</option>
                <option value="5 Year">5</option>
                <option value="6 Year">6</option>
                <option value="7 Year">7</option>
                <option value="8 Year">8</option>
                <option value="9 Year">9</option>
                <option value="10 Year">10</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input type='number' placeholder='fees' className='border rounded px-3 py-2' value={fees} onChange={(e)=>setFees(e.target.value)} required></input>
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Speciality</p>
            <select name='' id='' className='border rounded px-3 py-2' value={speciality} onChange={(e)=>setSpeciality(e.target.value)}>
              <option value='General physician'>General Physician</option>
              <option value='Gynecologist'>Gynecologist</option>
              <option value='Dermatologist'>Dermatologist</option>
              <option value='Pediatricians'>Pediatricians</option>
              <option value='Neurologist'>Neurologist</option>
              <option value='Gastroenterologist'>Gastroenterologist</option>
            </select>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
          <p>Education</p>
          <input type='text' placeholder='Education' className='border rounded px-3 py-2' value={degree} onChange={(e)=>setDegree(e.target.value)} required></input>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
          <p>Address</p>
          <input type='text' placeholder='address 1' className='border rounded px-3 py-2' value={address1} onChange={(e)=>setAddress1(e.target.value)} required></input>
          <input type='text' placeholder='address 2' className='border rounded px-3 py-2'  value={address2} onChange={(e)=>setAddress2(e.target.value)} required></input>
          </div>
        </div>
      </div>
      </div>
      <div>
        <p className='mt-4 mb-2'>About Doctor</p>
        <textarea type='text' placeholder='Write about doctor...' rows={5} className='w-full px-4 pt-2 border-none rounded' value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
      </div>
      <button className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
