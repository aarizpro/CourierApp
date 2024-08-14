import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const AddAutoawb = () => {
  const [airwayBill, setAirwayBill] = useState("");
  const [courierName, setCourierName] = useState("");
  const [courierNames, setCourierNames] = useState([]);
  const [awbStatus, setAwbStatus] = useState("Pending");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const url ="https://api-services-jg4f.onrender.com/";
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
  const fetchAwb = async () => {
    try {
      const response = await axios.get(`${url}api/autoawb/search?field=airwayBill&value=${airwayBill}`);
      if (response.data.length > 0) {
        
        setIsButtonVisible(false);
        toast.error('AWB Already Entered. Enter New Awb');
      } else {
        setIsButtonVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (airwayBill) {
      fetchAwb();
    }
  
  }, [airwayBill]);


  const saveOrUpdateAirway = async (e) => {
    e.preventDefault();
    if (airwayBill === "" || courierName === "" || awbStatus === "") {
      alert("Enter all Fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing) {
        // Update existing record
        await axios.put(`${url}api/autoawb/${editingId}`, {
          airwayBill,
          courierName,
          awbStatus
        });
        toast.success(`Updated ${airwayBill} Successfully`);
      } else {
        // Create new record
        await axios.post(`${url}api/autoawb`, {
          airwayBill,
          courierName,
          awbStatus
        });
        toast.success(`Saved ${airwayBill} Successfully`);
      }

      // Reset form and state
      setAirwayBill("");
      setAwbStatus("Pending");
      setIsLoading(false);
      setIsEditing(false);
      setEditingId(null);
      fetchData(); // Refresh the table data
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const editAirway = (row) => {
    setAirwayBill(row.airwayBill);
    setCourierName(row.courierName);
    setAwbStatus(row.awbStatus);
    setIsEditing(true);
    setEditingId(row._id);
  };

  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/autoawb/${id}`);
      toast.success('Deleted Successfully');
      fetchData(); // Refresh the table data after deletion
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
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
        <form onSubmit={saveOrUpdateAirway}>
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

            <div>
             {isButtonVisible&&(
              <button
                className='block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'
                type="submit"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>)}
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
}

export default AddAutoawb;
