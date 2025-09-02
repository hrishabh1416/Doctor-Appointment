import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import DoctorContext from '../context/Doctorcontext';
import axios from 'axios'
import {toast} from 'react-toastify'
const Login = ({ setshowlogin }) => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }));
  };

  const [currentstate, setcurrentstate] = useState("Sign up");
  const{backendUrl,token,setToken}=useContext(DoctorContext);
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try{
      const { name, email, password } = data;   
      if(currentstate==='Sign up') {
        const{data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if(data.success)  {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const{data}=await axios.post(backendUrl+'/api/user/login',{password,email})
        if(data.success)  {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
    }
    catch(error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex justify-center  backdrop-blur-sm bg-black/30">
      <form className="w-[min(90%,23vw)] min-w-[330px] bg-white text-gray-500 flex flex-col gap-6 p-6 rounded-md text-sm animate-fadeIn relative" onSubmit={onSubmitHandler}>
        <div className="flex justify-between items-center text-black">
          <h1 className="text-lg font-semibold">{currentstate}</h1>
          <img
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
            onClick={() => setshowlogin(false)}
          />
        </div>

        <div className="flex flex-col gap-5">
          {currentstate === "Sign up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onchangehandler}
              required
              className="outline-none border border-gray-300 p-2 rounded"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email-id"
            value={data.email}
            onChange={onchangehandler}
            required
            className="outline-none border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={data.password}
            onChange={onchangehandler}
            required
            className="outline-none border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="border-none p-2 rounded text-white bg-[#5F6FFF] text-base cursor-pointer w-full h-10"
        >
          {currentstate === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-start gap-2 mt-2 text-xs">
          <input type="checkbox" required className="mt-1 cursor-pointer" />
          <p>
            By continuing, I agree to all Terms and Services and adhere to all
            Privacy Policy.
          </p>
        </div>

        <p className="text-xs">
          {currentstate === "Sign up" ? (
            <>
              Already have an account?
              <span
                className="text-[#5F6FFF] font-medium ml-1 cursor-pointer"
                onClick={() => setcurrentstate("Login")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account
              <span
                className="text-[#3CAB3E] font-medium ml-1 cursor-pointer"
                onClick={() => setcurrentstate("Sign up")}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;

