import { Routes,Route, Link } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import AddCourier from "./Pages/AddCourier";
import Booking from "./Pages/Booking";
import AddCustomer from "./Pages/AddCustomer";
import AddAutoawb from "./Pages/AddAutoawb";
import BookingReport from "./Pages/BookingReport";
import AwbReport from "./Pages/AwbReport";
import AutoBooking from "./Pages/AutoBooking";
import Profile from "./Pages/Profile";
import Welcome from "./Pages/Welcome";
import Greetings from "./Pages/Greetings";
//import  NewDashboard  from "./Pages/NewDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App=()=>{
  return(
   <div>    
    <nav className="bg-gray-800">
      <div className="container mx-auto p-2">
        <Link to="/">
        <h2 className="text-white text-2xl font-bold">DashBoard</h2>
        </Link>
      </div>
    </nav>
    <div className="container mx=auto p-2 h-full">
    <Routes>
      <Route index element={<DashBoard/>}></Route>
      <Route path="/addcourier" element={<AddCourier/>}></Route>
      <Route path="/booking" element={<Booking/>}></Route>
      <Route path="/addcustomer" element={<AddCustomer/>}></Route>
      <Route path="/addautoawb" element={<AddAutoawb/>}></Route>
      <Route path="/repbooking" element={<BookingReport/>}></Route>
      <Route path="/repawb" element={<AwbReport/>}></Route>
      <Route path="/autobooking" element={<AutoBooking/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/welcome" element={<Welcome/>}></Route>
      <Route path="/greetings" element={<Greetings/>}></Route>

    </Routes>
    </div>
    <ToastContainer/>
    </div>

  )
}
export default App;