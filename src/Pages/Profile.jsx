import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [agencyName,setAgencyName]= useState("");
  const [instanceId,setInstanceId]= useState("");
  const [accessToken,setAccessToken]= useState("");
  const [agencyEmail,setAgencyEmail]= useState("");
  const [agencyImgurl,setAgencyImgurl]= useState("");
  const [agencyID,setAgencyID]= useState("");
  const [isloading,setIsloading]= useState(false);
  const url ="https://api-services-jg4f.onrender.com/";
  const saveCourier=async(e)=>{
    e.preventDefault();
    if(agencyName===""||instanceId===""||accessToken===""||agencyEmail===""||agencyImgurl===""){
      alert("Enter all Fields");
      return
    }
    try {
      setIsloading(true);
      const response = await axios.put(`${url}api/profile/${agencyID}`,{
        agencyName:agencyName,
        instanceId:instanceId,
        accessToken:accessToken,
        agencyEmail:agencyEmail,
        agencyImgurl:agencyImgurl
      });
      toast.success(`Updated Agency Details Successfully..`);
      setIsloading(false);
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/profile/66b5a00dc7ed276dc36b95b0`);
      setAgencyName(response.data.agencyName);
      setInstanceId(response.data.instanceId);
      setAccessToken(response.data.accessToken);
      setAgencyEmail(response.data.agencyEmail);
      setAgencyImgurl(response.data.agencyImgurl);
      setAgencyID(response.data._id);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className='max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6'>
      <div className='w-30 h-15'>
            <img src={agencyImgurl} className='w-30 h-15 object-cover'/>
            </div>
        <form onSubmit={saveCourier}>
          <div className='space-y-2'>
            <div>
              <label >Agency Name</label>
              <input type="text" value={agencyName} onChange={(e)=>setAgencyName(e.target.value)}  className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label >Instance ID</label>
              <input type="text" value={instanceId} onChange={(e)=>setInstanceId(e.target.value)}  className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label >Access Token</label>
              <input type="text" value={accessToken} onChange={(e)=>setAccessToken(e.target.value)}  className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label >Agency Email</label>
              <input type="text" value={agencyEmail} onChange={(e)=>setAgencyEmail(e.target.value)}  className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label >Agency Image URL</label>
              <input type="text" value={agencyImgurl} onChange={(e)=>setAgencyImgurl(e.target.value)} className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
            <button className='block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>Update</button>
              
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Profile