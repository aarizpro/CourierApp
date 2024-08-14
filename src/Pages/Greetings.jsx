import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Greetings = () => {
  const [instanceId, setInstanceID] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [file, setFile] = useState(null);
  const [cimgurl, setCimgurl] = useState("");
  const [customers, setCustomers] = useState([]); // State to store customer data

  const url = "https://api-services-jg4f.onrender.com/";
  const url1 = "https://awsupload.onrender.com/";

  useEffect(() => {
    fetchProfile();
    fetchCustomer(); // Fetch customers when component mounts
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${url1}upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCimgurl(response.data); // Ensure you are setting a valid string
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.log(error);
    }
  };

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

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`${url}api/customer`);
      setCustomers(response.data); // Store the customer data
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch customer data');
    }
  };

  const handleClick = async () => {
    if (!instanceId || !accessToken || !cimgurl) {
      toast.error("Missing required data to send greetings");
      return;
    }
  
    try {
      const sendMessages = customers.map(customer => {
        const mobNo = customer.custMob;
        return fetch(
          `https://bot.betablaster.in/api/send?number=91${mobNo}&type=media&media_url=${cimgurl}&instance_id=${instanceId}&access_token=${accessToken}`,
          { method: 'GET' }
        );
      });
  
      // Await all requests concurrently
      await Promise.all(sendMessages);
      //toast.success("Successfully sent greetings to all customers");
    } catch (error) {
     // console.error('Error sending greetings:', error);
      //toast.error("Failed to send greetings");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid gap-2 p-2 w-80"> {/* Reduced width */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label>Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])} // Handle file selection
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
            />
            <button type="button" onClick={uploadFile} className='block w-full mt-2 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>
              Upload
            </button>
          </div>
          <div className='w-30 h-15'>
            <img src={cimgurl} className='w-30 h-15 object-cover' alt="Uploaded" />
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 w-full"
            onClick={handleClick}
          >
            Send Greetings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
