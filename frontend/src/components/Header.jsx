import React from 'react';
import {assets} from '../assets/assets_frontend/assets';
function Header() {
  return (
    <div className='flex flex-col  md:flex-row flex-wrap bg-[#5F6FFF] rounded-lg px-6 md:px-10 lg:px-20'>
      <div className='md:w-1/2  flex flex-col items-start justify-center gap-10 py-4 m-auto md:py-[10vw]'>
        <p className='text-3xl md:text-8xl lg:text-7xl text-white font-bold leading-tight md:leading-tight lg-leading-tight '>Book Appointment<br></br> with Trusted Doctors</p>
      <div className='flex flex-row md:flex-row items-center gap-3 text-white text-2xl font-semibold'>
        <img src={assets.group_profiles} className='w-28'></img>
        <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'></br> schedule your appointment hastle free</p>
      </div>
      <a href="" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>Book Appointment <img src={assets.arrow_icon}></img></a>
      </div>
      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} className='w-full md:absolute bottom-0 h-auto rounded-lg'></img>
      </div>
    </div>
  );
}

export default Header;
