import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const AddAutoawb = () => {
  const [airwayBill, setAirwayBill] = useState("");
  const [courierName, setCourierName] = useState("");
  const [courierNames, setCourierNames] = useState([]);
  const [awbStatus, setAwbStatus] = useState("Pending");
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null); // State to hold selected file
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  //const url ="https://api-services-jg4f.onrender.com/";
  const url ="https://allapi-4fmi.onrender.com/";
   useEffect(() => {
    fetchData();
    fetchCourierNames();
  }, []);

  const fetchCourierNames = async () => {
    try {
      const response = await axios.get(`${url}api/courier`);
      setCourierNames(response.data);
    } catch (error) {
      console.error('Error fetching courier names:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/autoawb`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleAwb = (e) => {
    setAirwayBill(e.target.value);
  };

  const uploadCSV = () => {
    if (!file) {
      toast.error("Please choose a CSV file");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const csvData = results.data;
        try {
          await axios.post(`${url}api/autoawb/upload`, csvData); // Endpoint to handle CSV data
          toast.success("File uploaded successfully");
          fetchData(); // Refresh the DataTable after upload
        } catch (error) {
          toast.error("Error uploading CSV data");
          console.error(error);
        }
      }
    });
  };
  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/autoawb/${id}`); // Assuming DELETE request works like this
      toast.success("Record deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      toast.error("Error deleting record");
      console.error(error);
    }
  };
  const editAirway = (row) => {
    setIsEditing(true); // Enable editing mode
    setEditingId(row._id); // Store the ID of the item being edited
    setAirwayBill(row.airwayBill); // Populate the form with the selected record
    setCourierName(row.courierName);
    setAwbStatus(row.awbStatus);
  };  
  const saveRecord = async () => {
    const record = {
      airwayBill,
      courierName,
      awbStatus,
    };
  
    // Check for duplicates in the frontend data array
    const duplicate = data.some((item) => item.airwayBill === airwayBill);
    if (duplicate) {
      toast.error("Duplicate Airway Bill detected");
      return;
    }
  
    try {
      if (isEditing) {
        // If editing mode, update the record
        await axios.put(`${url}api/autoawb/${editingId}`, record); // Assuming PUT endpoint
        toast.success("Record updated successfully");
      } else {
        // If not editing, save a new record
        await axios.post(`${url}api/autoawb/save`, record);
        toast.success("Record saved successfully");
      }
  
      fetchData(); // Refresh DataTable
      // Clear form fields after saving
      setAirwayBill("");
      
      setAwbStatus("Pending");
      setIsEditing(false); // Exit editing mode
      setEditingId(null); // Clear editing ID
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Airway Bill already exists");
      } else {
        toast.error("Error saving record");
      }
      console.error(error);
    }
  };
  

  const columns = [
    {
      name: 'Airway Bill',
      selector: row => row.airwayBill,
    },
    {
      name: 'Courier Name',
      selector: row => row.courierName,
    },
    {
      name: 'Status',
      selector: row => row.awbStatus,
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <button
            onClick={() => editAirway(row)}
            className='mr-2 bg-yellow-500 text-white px-2 py-1 rounded'
          >
            Edit
          </button>
          <button
            onClick={() => deleteAirway(row._id)}
            className='bg-red-500 text-white px-2 py-1 rounded'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex">
      {/* Left Side - Form */}
      <div className='w-1/2 max-w-lg bg-white shadow-lg p-7 rounded mt-2'>
        <h2 className='font-semibold text-2xl mb-4 block text-center'>
          {isEditing ? 'Edit Auto Booking Airway Bill' : 'Add Auto Booking Airway Bill'}
        </h2>
        <form>
          <div className='space-y-2'>
            <div>
              <label>Courier Name</label>
              <select
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200'
              >
                <option value='' disabled>Select Courier Name</option>
                {courierNames.map((name) => (
                  <option key={name._id} value={name.courierName}>
                    {name.courierName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Status</label>
              <input
                type="text"
                value={awbStatus}
                onChange={(e) => setAwbStatus(e.target.value)}
                placeholder='Enter Status'
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
            <div>
              <label>Airway Bill Number</label>
              <input
                type="text"
                value={airwayBill}
                onChange={handleAwb}
                placeholder='Enter Airway Bill Number'
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={saveRecord}
                className='block w-full bg-green-600 text-white rounded-sm px-4 py-2 font-bold hover:bg-green-500 hover:cursor-pointer'
              >
                Save
              </button>
              <button
                type="button"
                onClick={uploadCSV}
                className='block w-full bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'
              >
                Upload CSV
              </button>
            </div>
            <div>
              <label>Upload File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])} // Handle file selection
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400'
              />
            </div>
          </div>
        </form>
      </div>

      {/* Right Side - Table */}
      <div className='w-1/2 pt-4 pl-4'>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default AddAutoawb;
