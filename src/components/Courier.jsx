import React from 'react'
import { Link } from 'react-router-dom'
import { HiArchive } from "react-icons/hi";
import { toast } from 'react-toastify';
import axios from 'axios';
const Courier = ({courier }) => {
  const url ="https://api-services-jg4f.onrender.com/";
  const courierDelete=async()=>{
    try {
      const response = await axios.delete(`${url}api/courier/${courier._id}`);
    toast.success(`Successfully ${courier.courierName} Deleted..`);
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
    
  }
  return (
    <div className=''>
        <div className='w-full h-full bg-white rounded shadow=lg overflow-hidden px-3 pt-2 pb-2  '>
           <div className='w-30 h-15'>
            <img src={courier.courierImg} className='w-30 h-15 object-cover'/>
            </div>
            
                 <div className='px-4 pt-2 pb-2'>
                <div className='text-sm'>{courier.courierSite}</div>
                <div className='mt-2 flex gap-4'>
                    <Link 
                     to="/booking"
                     state={{
                         courierImg: courier.courierImg,
                         courierName: courier.courierName,
                         courierSite: courier.courierSite,
                         
                     }}
                    className='inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer'> Booking</Link>
                    
                </div>
                <div className='mt-2 flex gap-4'>
                    <Link to={`/autobooking`}
                    state={{
                      courierImg: courier.courierImg,
                      courierName: courier.courierName,
                      courierSite: courier.courierSite
                  }}
                    className='inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer'>Auto Book </Link>
                    
                </div>
                <div className='px-1 py-4 '>
                <HiArchive className='hover:cursor-pointer ' onClick={courierDelete} />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Courier