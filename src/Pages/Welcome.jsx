import React, {  useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Welcome = () => {
    const [mobNo,setMobno]= useState("");
    const [instanceId,setInstanceID]= useState("");
    const [accessToken,setAccessToken]= useState("");
    const [message,setMessage]= useState("Welcome to Dingdong Courier We are Happy to Serve you...");
    const url ="https://api-services-jg4f.onrender.com/";

    useEffect(() => {
        fetchProfile();
      }, []);
    const fetchProfile = async () => {
        try {
          const response = await axios.get(`${url}api/profile`);
          console.log(response.data);
          setInstanceID(response.data[0].instanceId);
          setAccessToken(response.data[0].accessToken);
          } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('You will face Error in WhatsApp Message');
        }
      };
      const handleClick = async () => {
        try {
          const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/welcome.jpg';
          const response = await fetch(`https://bot.betablaster.in/api/send?number=91${mobNo}&type=media&message=${message}&media_url=${media_url}&instance_id=${instanceId}&access_token=${accessToken}`, {
            method: 'GET',
          });
          console.log(response.data);
          setMobno('');
         // toast.success("Successfully Welcomed the Client")
        } catch (error) {
         // toast.error('Error sending message:', error);
         setMobno('');
        }
      };
    
    return(

    
    <div className="flex justify-center items-center h-screen">
    <div className="grid gap-2 p-2 w-80"> {/* Reduced width */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={mobNo}
          onChange={(e) => setMobno(e.target.value)}
          className="col-span-1 p-2 bg-gray-100 rounded shadow w-full"
          placeholder="Enter Mobile Number"
        />
        <textarea
          id="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="4"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 w-full"
          onClick={handleClick}
        >
          Welcome
        </button>
      </div>
    </div>
  </div>
  
);};

export default Welcome