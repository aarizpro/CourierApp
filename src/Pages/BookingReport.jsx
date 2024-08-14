import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

const BookingReport = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const url = "https://api-services-jg4f.onrender.com/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/booking`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const filteredData = data.filter(row => 
    row.airwayBill.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { name: 'Date', selector: row => row.createdAt, sortable: true },
    { name: 'Sender Name', selector: row => row.fromName, sortable: true },
    { name: 'Sender Address', selector: row => row.fromAddr, sortable: true },
    { name: 'Sender Mobile', selector: row => row.fromMob, sortable: true },
    { name: 'Sender Email', selector: row => row.fromEmail, sortable: true },
    { name: 'Sender Pincode', selector: row => row.fromPincode, sortable: true },
    { name: 'Receiver Name', selector: row => row.toName, sortable: true },
    { name: 'Receiver Address', selector: row => row.toAddr, sortable: true },
    { name: 'Receiver Mobile', selector: row => row.toMob, sortable: true },
    { name: 'Receiver Email', selector: row => row.toEmail, sortable: true },
    { name: 'Receiver Pincode', selector: row => row.toPincode, sortable: true },
    { name: 'Airway Bill', selector: row => row.airwayBill, sortable: true },
    { name: 'Weight', selector: row => row.weight, sortable: true },
    { name: 'Quantity', selector: row => row.quantity, sortable: true },
    { name: 'Type', selector: row => row.shipType, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    { name: 'Courier', selector: row => row.courierName, sortable: true },
    {
      name: 'Action',
      cell: row => (
        <div>
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

  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/booking/${id}`);
      toast.success('Deleted Successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='bg-white shadow-lg p-7 rounded-lg max-w-7xl w-full'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>
          Booking Details
        </h1>
        <div className="mb-4 flex justify-center">
          <input 
            type="text" 
            placeholder="Search by Awb No" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='p-2 border border-gray-300 rounded w-1/3'
          />
        </div>
        <div className="flex-grow">
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={{
              headCells: {
                style: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                },
              },
              cells: {
                style: {
                  fontSize: '14px',
                  textAlign: 'center',
                },
              },
              rows: {
                style: {
                  minHeight: '56px', // override the row height
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingReport;
