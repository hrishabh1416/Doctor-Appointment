import React from 'react';
import {assets} from '../assets/assets_frontend/assets'
function Contact() {
  return (
    <div>
      <div className='text-center text-3xl pt-10 text-gray-500'>
        <p>Contact  <span className='text-gray-700 font-bold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-xl'>
        <img src={assets.contact_image} className='w-full md:max-w-[360px]'></img>
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-lg text-gray-600'>Our Office</p>
        <p className='text-gray-500'>54709 Williams Station <br/> Suite 350,Washington, USA</p>
        <p className='text-gray-500'>Tel:(415) 555-0132 <br/> Email:prescripto@gmail.com</p>
        <p className='font-semibold text-lg text-gray-600'>Carrers at Prescripto</p>
        <p className='text-gray-500'>Learn More about our Team and Job opening</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
      </div>
      </div>
    </div>
  );
}

export default Contact;
