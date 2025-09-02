import './App.css';
import { BrowserRouter,Route,Routes,useLocation } from 'react-router-dom';
import Doctorcontextprovider from './context/Doctorcontextprovider';
import Doctors from './pages/Doctors'
import Navbar from './components/Navbar';
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import About from './pages/About';
import MyProfile from './pages/MyProfile'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
function AllContent() {
  return (
      <div>
        <Home/>
      </div>
  )
}
function MainApp() {
  const location=useLocation();

  return (
  <> 
    <div className='app'>
    <ToastContainer/>
    <Navbar/>
    {location.pathname==="/" && <AllContent/>}
    <Routes>
      <Route path='/doctors' element={<Doctors/>}></Route>
      <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/myprofile' element={<MyProfile/>}></Route>
      <Route path='/myappointments' element={<MyAppointments/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/appointment/:docId' element={<Appointment/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    <Footer/>
    </div>
  </>
  );
}
function App() {
  return (
    <BrowserRouter>
    <Doctorcontextprovider>
    <MainApp/>
    </Doctorcontextprovider>
    </BrowserRouter>
  );
}
export default App;