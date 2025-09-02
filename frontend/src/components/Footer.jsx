import React from 'react';
import {assets} from '../assets/assets_frontend/assets';
function Footer() {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-xl '>
        <div>
          <img className='mb-5 w-40' src={assets.logo}></img>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Welcome to our online doctor appointment booking platform, your one-stop destination for reliable healthcare services. Our website connects patients with qualified and experienced doctors across various specialties. Whether you're seeking a general physician, dentist, pediatrician, dermatologist, or any other specialist, booking an appointment is just a few clicks away.</p>
        </div>
        <div>
          <p className='text-xl font-semibold mb-5'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600 font-semibold'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='text-xl font-semibold mb-5 '>
          <p>Get in Touch</p>
          <ul>
            <li>+1-212-456-7890</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center font-bold'>Copyright 2024 @Prescripto-All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
