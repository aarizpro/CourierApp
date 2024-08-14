import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

const AddCustomer = () => {
  const [custName, setCustName] = useState("");
  const [custAddr, setCustAddr] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custMob, setCustMob] = useState("");
  const [custPincode, setCustPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const url = "https://api-services-jg4f.onrender.com/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchMobno = async () => {
    try {
      const response = await axios.get(`${url}api/customer/search?field=custMob&value=${custMob}`);
      if (response.data.length > 0) {
        // If the mobile number exists in the database, disable the button
        setIsButtonVisible(false);
        toast.error('Customer detail already added');
      } else {
        // If the mobile number does not exist, enable the button
        setIsButtonVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (custMob.length === 10) {
      fetchMobno();
    } else {
      // Reset button visibility if the mobile number is not fully entered
      setIsButtonVisible(false);
    }
  }, [custMob]);

  const handleCustMob = (e) => {
    setCustMob(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/customer`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const filteredData = data.filter(row => 
    row.custName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: 'Name',
      selector: row => row.custName,
    },
    {
      name: 'Address',
      selector: row => row.custAddr,
    },
    {
      name: 'Pincode',
      selector: row => row.custPincode,
    },
    {
      name: 'Email',
      selector: row => row.custEmail,
    },
    {
      name: 'Mobile No',
      selector: row => row.custMob,
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

  const saveOrUpdateAirway = async (e) => {
    e.preventDefault();
    if (custName === "" || custAddr === "" || custEmail === "" || custMob === "" || custPincode === "") {
      alert("Enter all Fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing) {
        await axios.put(`${url}api/customer/${editingId}`, {
          custName,
          custAddr,
          custEmail,
          custMob,
          custPincode
        });
        toast.success(`Updated ${custName} Successfully`);
      } else {
        await axios.post(`${url}api/customer`, {
          custName,
          custAddr,
          custEmail,
          custMob,
          custPincode
        });
        toast.success(`Saved ${custName} Successfully`);
      }

      setCustName("");
      setCustAddr("");
      setCustEmail("");
      setCustMob("");
      setCustPincode("");
      setIsLoading(false);
      setIsEditing(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const editAirway = (row) => {
    setCustName(row.custName);
    setCustAddr(row.custAddr);
    setCustEmail(row.custEmail);
    setCustMob(row.custMob);
    setCustPincode(row.custPincode);
    setIsEditing(true);
    setEditingId(row._id);
  };

  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/customer/${id}`);
      toast.success('Deleted Successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2 max-w-lg bg-white shadow-lg p-7 rounded mt-2'>
        <h2 className='font-semibold  mb-2 block text-center'>
          {isEditing ? "Edit Customer Details" : "Add Customer Details"}
        </h2>
        <form onSubmit={saveOrUpdateAirway}>
          <div className='space-y-2'>
            <div>
              <label>Customer Name</label>
              <input type="text" value={custName} onChange={(e) => setCustName(e.target.value)} placeholder='Enter Customer Name' className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label>Customer Address</label>
              <textarea
                id="textarea"
                value={custAddr}
                onChange={(e) => setCustAddr(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div>
              <label>Customer Pincode</label>
              <input type="number" value={custPincode} onChange={(e) => setCustPincode(e.target.value)} placeholder='Enter Customer Pincode' className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              <label>Customer Mobile Number</label>
              <input 
                type="text" 
                maxLength={10} 
                value={custMob} 
                onChange={handleCustMob} 
                className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' 
              />
            </div>
            <div>
              <label>Customer Email</label>
              <input type="text" value={custEmail} onChange={(e) => setCustEmail(e.target.value)} placeholder='Enter Customer Email ID' className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-grey-400' />
            </div>
            <div>
              {isButtonVisible && (
                <button className='block w-full mt-6 bg-blue-700 text-white rounded-sm px-2 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer'>
                  {isEditing ? 'Update' : 'Save'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className='w-1/1 pt-4 pl-4 rounded flex flex-col'>
        <input 
          type="text" 
          placeholder="Search by Customer Name" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <div className="flex-grow">
          <DataTable
            columns={columns}
            data={filteredData}
            selectableRows
            fixedHeader
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
