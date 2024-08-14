import React, {useState, useEffect}from 'react'
import axios from 'axios'
import Courier from '../components/Courier';
import { Link } from 'react-router-dom';
const DashBoard = () => {
  const [courier, setCourier]= useState([]);
  const [isLoading,setIsLoading]= useState(false);
  const url ="https://api-services-jg4f.onrender.com/";
  const getCourier=async()=>{
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}api/courier`);
      console.log(response.data);
      setCourier(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCourier();
  },[]);

  return (
    <div>
      <div className='mt-2 flex gap-4'>
        <Link to={'/addcourier'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Add Courier</Link>
        <Link to={'/addautoawb'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Add Airway Bill</Link>
        <Link to={'/addcustomer'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Add Customers</Link>
        <Link to={'/repbooking'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Booking Reports</Link>
        <Link to={'/profile'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Profile</Link>
        <Link to={'/repawb'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>RePrint AWB</Link>
        <Link to={'/welcome'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Welcome</Link>
        <Link to={'/greetings'} className='inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Greetings</Link>
      </div>
      
      <div className='grid grid-cols-2 lg:grid-cols-6 gap-4 mt-5'>
        {isLoading ?(
          "Loading"
        ):(
          <>
          {courier.length>0 ?(
            <>
            {
              courier.map((courier,index)=>{
                return (
                  <Courier key={index} courier={courier}/>
                )
              })
            }
            </>
          ):(
            <div>There is no Couriers..</div>
          )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashBoard