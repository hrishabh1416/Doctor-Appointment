import React, { useContext, useState } from 'react';
import {assets} from '../assets/assets_frontend/assets'
import DoctorContext from '../context/Doctorcontext'
function MyProfile() {
  const {userdata,setuserdata,updateUserProfile}=useContext(DoctorContext)
  const [isEdit,setisEdit]=useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("userId", userdata._id);  
    formData.append("name", userdata.name);
    formData.append("phone", userdata.phone);
    formData.append("dob", userdata.dob);
    formData.append("gender", userdata.gender);
    formData.append("address", JSON.stringify(userdata.address));
    if(selectedImage) {
      formData.append("image", selectedImage);
    }
  
    const success = await updateUserProfile(formData);
    if (success) setisEdit(false); 
  };
  return  userdata && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <div className="w-36">
  <img 
    src={selectedImage ? URL.createObjectURL(selectedImage) : (userdata.image ? userdata.image : assets.profile_pic)} 
    alt="Profile" 
    className="w-36 h-36 rounded object-cover border cursor-pointer"
    onClick={() => document.getElementById("profileImageInput").click()}
  />
  {isEdit&&<input 
    type="file" 
    accept="image/*"
    id="profileImageInput"
    className="hidden"
    onChange={(e) => setSelectedImage(e.target.files[0])}
  />}
</div>

      {
        isEdit?<input type='text' value={userdata.name} onChange={e=>setuserdata(prev=>({...prev,name:e.target.value}))} className='bg-gray-50 text-3xl font-medium max-w-80 mt-4'></input>:<p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-natrual-500 underline mt-3'>Contact Information</p>
        <div className=' grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-700'>
        <p className='font-medium'>Email id :</p>
        <p className='text-blue-500'>{userdata.email}</p>
        <p className='font-medium'>Phone : </p>
        {
             isEdit?<input type='text' value={userdata.phone} onChange={e=>setuserdata(prev=>({...prev,phone:e.target.value}))} className='bg-gray-100 max-w-52'></input>:<p className='text-blue-500'>{userdata.phone}</p>
        }
        <p className='font-medium'>Address:</p>
        {
           isEdit?
           <p>
            <input className='bg-gray-50' type='text' value={userdata.address.line1} onChange={(e)=>setuserdata(prev=>({...prev,address:{...prev.address,line1:e.target.value},}))}></input>
            <br/>
            <input className='bg-gray-50' type='text' value={userdata.address.line2} onChange={(e)=>setuserdata(prev=>({...prev,address:{...prev.address,line2:e.target.value},}))}></input>
           </p>
           :
           <p className='text-gray-500'>
            {userdata.address.line1||""}
            <br/>
            {userdata.address.line2||""}
           </p>
        }
      </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit?
            <select className='max-w-20 bg-gray-100' value={userdata.gender} onChange={(e)=>setuserdata(prev=>({...prev,gender:e.target.value}))}>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
            :
            <p className='text-gray-400'>{userdata.gender}</p>
        }
        <p className='font-medium'>Birthday:</p>
        {
            isEdit?
            <input className='max-w-28 bg-gray-100' type='date' onChange={(e)=>setuserdata(prev=>({...prev,dob:e.target.value}))} value={userdata.dob}></input>
            :
            <p className='text-gray-400'>{userdata.dob}</p>
        }
        </div>
      </div>
      <div className='mt-10'>
        {
        isEdit?
        <button className='border border-[#5F6FFF] px-8  py-2 rounded-full  hover:bg-[#5F6FFF] hover:text-white transition-all cursor-pointer' onClick={handleSave}>Save Information</button>
        :
        <button className='border border-[#5F6FFF] px-8  py-2 rounded-full  hover:bg-[#5F6FFF] hover:text-white transition-all cursor-pointer '  onClick={()=>setisEdit(true)}>Edit</button>
        }
      </div>
    </div>  
  );
}

export default MyProfile;
