import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

const BookingReport = () => {
  const [data, setData] = useState([]);
  const [searchAwb, setSearchAwb] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const url = "https://api-services-jg4f.onrender.com/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/booking?sortBy[]=createdAt&sortOrder[]=desc`);
      console.log(response.data); // Log data to check structure
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const filteredData = data.filter(row => 
  (searchAwb === "" || row.airwayBill.toLowerCase().includes(searchAwb.toLowerCase())) &&
  (searchMobile === "" || row.fromMob.toLowerCase().includes(searchMobile.toLowerCase()) || row.toMob.toLowerCase().includes(searchMobile.toLowerCase()))
);

  console.log("Filtered Data:", filteredData); // Log filtered data

  const columns = [
    { name: 'Date', selector: row => row.createdAt, sortable: true, csvKey: 'createdAt' },
    { name: 'Sender Name', selector: row => row.fromName, sortable: true, csvKey: 'fromName' },
    { name: 'Sender Address', selector: row => row.fromAddr, sortable: true, csvKey: 'fromAddr' },
    { name: 'Sender Mobile', selector: row => row.fromMob, sortable: true, csvKey: 'fromMob' },
    { name: 'Sender Email', selector: row => row.fromEmail, sortable: true, csvKey: 'fromEmail' },
    { name: 'Sender Pincode', selector: row => row.fromPincode, sortable: true, csvKey: 'fromPincode' },
    { name: 'Receiver Name', selector: row => row.toName, sortable: true, csvKey: 'toName' },
    { name: 'Receiver Address', selector: row => row.toAddr, sortable: true, csvKey: 'toAddr' },
    { name: 'Receiver Mobile', selector: row => row.toMob, sortable: true, csvKey: 'toMob' },
    { name: 'Receiver Email', selector: row => row.toEmail, sortable: true, csvKey: 'toEmail' },
    { name: 'Receiver Pincode', selector: row => row.toPincode, sortable: true, csvKey: 'toPincode' },
    { name: 'Airway Bill', selector: row => row.airwayBill, sortable: true, csvKey: 'airwayBill' },
    { name: 'Weight', selector: row => row.weight, sortable: true, csvKey: 'weight' },
    { name: 'Quantity', selector: row => row.quantity, sortable: true, csvKey: 'quantity' },
    { name: 'Type', selector: row => row.shipType, sortable: true, csvKey: 'shipType' },
    { name: 'Amount', selector: row => row.amount, sortable: true, csvKey: 'amount' },
    { name: 'Courier', selector: row => row.courierName, sortable: true, csvKey: 'courierName' },
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

  const csvHeaders = columns
    .filter(col => col.csvKey) // Filter out columns that don't have a `csvKey`
    .map(col => ({ label: col.name, key: col.csvKey }));

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

        <div className="mb-4 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="Search by Awb No"
            value={searchAwb}
            onChange={(e) => setSearchAwb(e.target.value)}
            className='p-2 border border-gray-300 rounded w-1/3'
          />
         
        </div>

        <div className="flex justify-end mb-4">
          <CSVLink
            data={filteredData}
            headers={csvHeaders}
            filename={"booking-report.csv"}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download CSV
          </CSVLink>
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
                  minHeight: '56px',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingReport;
