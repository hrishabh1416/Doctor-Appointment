import React, { useContext } from 'react'
import Login from './pages/Login'
import AdminContext from './context/AdminContext'
import AdminContextProvider from './context/AdminContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorList from './pages/Admin/DoctorsList'
import AppContextProvider from './context/AppContextProvider'
import DoctorContextProvider from './context/DoctorContextProvider'
import DoctorContext from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
const AppContent = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return (
    <>
      {aToken || dToken ? (
        <div className='bg-[#F8F9FD]'>
          <Navbar/>
          <div className='flex items-start'>
          <Sidebar/>
          <Routes>
          <Route path='/' element={<></>}></Route>
            {/* Admin Routes */}
            <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
            <Route path='/all-appointments' element={<AllAppointments/>}></Route>
            <Route path='/add-doctor' element={<AddDoctor/>}></Route>
            <Route path='/doctor-list' element={<DoctorList/>}></Route>
            {/* Doctor Routes */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
            <Route path='/doctor-appointments' element={<DoctorAppointments/>}></Route>
            <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
          </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <DoctorContextProvider>
      <AppContent />
      </DoctorContextProvider>
      </AppContextProvider>
    </AdminContextProvider>
    </BrowserRouter>
  )
}

export default App

