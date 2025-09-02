import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router';
import Login from '../pages/Login.jsx';
import DoctorContext from '../context/Doctorcontext';

function Navbar() {
  const navigate = useNavigate();
  const {token, setToken} = useContext(DoctorContext);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const[profilemenu,setprofilemenu]=useState(false)
  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <>
   
      <div className="flex justify-between items-center text-xl py-4 mb-5 border-b border-b-gray-400 px-6 md:px-16">
       
        <NavLink to="/">
          <img src={assets.logo} className="w-36 md:w-44 cursor-pointer" />
        </NavLink>

       
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to="/" className={({ isActive }) =>
              isActive
                ? 'text-[#5F6FFF] underline underline-offset-4'
                : 'hover:text-[#5F6FFF]'
            }>
            <li className="py-1 " >Home</li>
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) =>
              isActive
                ? 'text-[#5F6FFF] underline underline-offset-4'
                : 'hover:text-[#5F6FFF]'
            }>
            <li className="py-1">All Doctors</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) =>
              isActive
                ? 'text-[#5F6FFF] underline underline-offset-4'
                : 'hover:text-[#5F6FFF]'
            }>
            <li className="py-1">About</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) =>
              isActive
                ? 'text-[#5F6FFF] underline underline-offset-4'
                : 'hover:text-[#5F6FFF]'
            }>
            <li className="py-1">Contact</li>
          </NavLink>
        </ul>
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative"  onMouseEnter={() => setprofilemenu(true)}
            onMouseLeave={() => setprofilemenu(false)}>
            <img src={assets.profile_pic} className="w-10 rounded-full" />
              <img src={assets.dropdown_icon} className="w-2.5" />
              <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 group-hover:block ${profilemenu?'block':'hidden'}`}>
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate('/myprofile')}
                    className="hover:text-[#5F6FFF] cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/myappointments')}
                    className="hover:text-[#5F6FFF] cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-[#5F6FFF] cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#5F6FFF] text-white px-6 py-2 rounded-full hidden md:block hover:bg-indigo-800"
            >
              Create Account
            </button>
          )}
          {/* Hamburger Menu */}
          <div
            className="block md:hidden cursor-pointer w-[25px] h-[2px] bg-[#333] relative
            before:content-[''] before:w-[25px] before:h-[2px] before:bg-[#333] before:absolute before:left-0 before:top-[-8px]
            after:content-[''] after:w-[25px] after:h-[2px] after:bg-[#333] after:absolute after:left-0 after:top-[8px]"
            onClick={() => setMenuOpen(!menuOpen)}
          ></div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 border-t border-gray-200">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <p className="block text-lg font-medium hover:text-[#5F6FFF]">Home</p>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>
            <p className="block text-lg font-medium hover:text-[#5F6FFF]">All Doctors</p>
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            <p className="block text-lg font-medium hover:text-[#5F6FFF]">About</p>
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            <p className="block text-lg font-medium hover:text-[#5F6FFF]">Contact</p>
          </NavLink>

          {!token && (
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="bg-[#5F6FFF] text-white px-6 py-2 rounded-full hover:bg-indigo-800 w-full"
            >
              Create Account
            </button>
          )}
        </div>
      )}
      {showLogin && <Login setshowlogin={setShowLogin} />}
    </>
  );
}

export default Navbar;
