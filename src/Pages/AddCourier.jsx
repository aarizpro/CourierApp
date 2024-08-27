import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourier = () => {
  const [cname, setCname] = useState("");
  const [csite, setCsite] = useState("");
  const [cimgurl, setCimgurl] = useState("");
  const [cdesc, setCdesc] = useState("");
  const [file, setFile] = useState(null); // Add state for file
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
 //const url ="https://api-services-jg4f.onrender.com/";
 const url ="https://allapi-4fmi.onrender.com/";
 const saveCourier = async (e) => {
    e.preventDefault();
    if (cname === "" || csite === "" || cimgurl === "" || cdesc === "") {
      alert("Enter all Fields");
      return;
    }
    try {
      setIsloading(true);
      const response = await axios.post(`${url}api/courier`, {
        courierName: cname,
        courierSite: csite,
        courierImg: cimgurl,
        courierDesc: cdesc
      });
      toast.success(`Saved ${cname} Successfully..`);
      setIsloading(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  };

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
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setCimgurl(response.data); // Ensure you are setting a valid string
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.log(error);
    }
  };

  return (
    <div>
      <div className='max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6'>
        <h2 className='font-semibold text-2xl mb-4 block text-center'>Create New Courier</h2>
        <form onSubmit={saveCourier}>
          <div className='space-y-2'>
            <div>
              <label>Courier Name</label>
              <input
                type="text"
                value={cname}
                onChange={(e) => setCname(e.target.value)}
                placeholder='Enter Courier Name'
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
            <div>
              <label>Courier Web Address</label>
              <input
                type="text"
                value={csite}
                onChange={(e) => setCsite(e.target.value)}
                placeholder='Enter Courier Website'
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
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
            <div>
              <label>Courier Image URL</label>
              <input
                type="text"
                value={cimgurl}
                onChange={(e) => setCimgurl(e.target.value)}
                placeholder='Enter Courier Image URL'
                readOnly
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
            <div>
              <label>Courier Description</label>
              <input
                type="text"
                value={cdesc}
                onChange={(e) => setCdesc(e.target.value)}
                placeholder='Enter Courier Description'
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
            <div>
              {!isloading && (<button className='block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>
                Save
              </button>)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourier;
