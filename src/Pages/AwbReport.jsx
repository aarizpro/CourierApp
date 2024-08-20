import React, {  useState, useEffect,useRef } from 'react';
import Barcode from 'react-barcode';
import { toast } from 'react-toastify';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import courierImg1 from'../assets/rkaylogo.png';
import amazon from '../assets/amazon.jpeg';
import aramex from '../assets/aramex.png';
import bluedart from '../assets/bluedart.png';
import delhivery from '../assets/delhivery.png';
import dhl from '../assets/dhl.png';
import dtdc from '../assets/dtdc.png';
import ecom from '../assets/ecom.jpeg';
import ekart from '../assets/ekart.jpeg';
import fedex from '../assets/fedex.jpeg';
import franch from '../assets/franch.png';
import movin from '../assets/movin.jpeg';
import professional from '../assets/professional.png';
import stcourier from '../assets/ST Courier.jpg';
import trackon from '../assets/trackon.png';
import xpressbees from '../assets/xpressbees.jpeg';

const AwbReport = () => {
  const printRef = useRef();
  
 // const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [awbNo, setAwbNo] = useState('');
  const [awbNo1, setAwbNo1] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [fromPincode, setFromPincode] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddr, setFromAddr] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [shipmentType, setShipmentType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [amount, setAmount] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [courierName,setCourierName]=useState('');
  const [couSite, setCouSite] = useState('');
  const messageTxt = 'Thank you.. Further Tracking Details Please visit ' +couSite;
  const [bookings, setBookings] = useState([]);
  
  const url ="https://api-services-jg4f.onrender.com/";
  const fetchCurrentDateBookings = async () => {
    try {
      const response = await axios.get(`${url}api/booking?sortBy[]=createdAt&sortOrder[]=desc`);
      const allBookings = response.data;
      setBookings(allBookings);
    } catch (error) {
      console.error('Failed to fetch current date bookings:', error);
    }

  };

  const fetchData=()=>{
    if(courierName==="Amazon"){
      setImgurl(amazon);
      setCouSite("www.track.amazon.in");
    }else if(courierName==="Aramex"){
      setImgurl(aramex);
      setCouSite("www.aramex.com");
    }else if(courierName==="Bluedart"){
      setImgurl(bluedart);
      setCouSite("www.bluedart.com");
    }else if(courierName==="Delhivery"){
      setImgurl(delhivery);
      setCouSite("www.delhivery.com");
    }else if(courierName==="DHL"){
      setImgurl(dhl);
      setCouSite("www.dhl.com");
    }else if(courierName==="DTDC Courier"){
      setImgurl(dtdc);
      setCouSite("www.dtdc.in");
    }else if(courierName==="Ecom"){
      setImgurl(ecom);
      setCouSite("www.ecomexpress.com");
    }else if(courierName==="Ekart"){
      setImgurl(ekart);
      setCouSite("www.ekart.in");
    }else if(courierName==="Fedex"){
      setImgurl(fedex);
      setCouSite("www.fedex.com");
    }else if(courierName==="Franch"){
      setImgurl(franch);
      setCouSite("www.franchexpress.com");
    }else if(courierName==="Movin"){
      setImgurl(movin);
      setCouSite("www.movin.in");
    }else if(courierName==="The Professional Courier"){
      setImgurl(professional);
      setCouSite("www.tpcindia.com");
    }else if(courierName==="ST Courier"){
      setImgurl(stcourier);
      setCouSite("www.stcourier.com");
    }else if(courierName==="Trackon"){
      setImgurl(trackon);
      setCouSite("www.trackon.com");
    }else if(courierName==="XpressBees"){
      setImgurl(xpressbees);
      setCouSite("www.xpressbees.com");
    }else{
      setImgurl(courierImg1);
    }

  }

  // Fetch agency data on component mount


   
   const downloadImage = async() => {
    if (printRef.current) {
      try {
        // Capture the HTML element as a canvas
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');
  
        // Create a new PDF document
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [168, 100] // Postcard size: 100mm x 148mm
        });
  
        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, 168, 100); // Fit image to postcard size
  
        // Save the PDF
        pdf.save('booking-details.pdf');
        toast.success('Downloaded');
      } catch (error) {
        console.error('Failed to generate PDF:', error);
        toast.error('Failed to download the PDF');
      }
    }
    
  }
  
  
  const handleAwb = (e) => {
    setAwbNo(e.target.value);
   
  };
 


  const fetchAwb = async () => {
    
    try {
      const response = await axios.get(`${url}api/booking/search?field[]=airwayBill&value[]=${awbNo}`);
      if (response.data.length > 0) {
        setAwbNo(response.data[0].airwayBill);
        setCourierName(response.data[0].courierName);
        setSenderMobile(response.data[0].fromMob);
        setSenderName(response.data[0].fromName);
        setFromAddr(response.data[0].fromAddr);
        setFromPincode(response.data[0].fromPincode);
        setFromEmail(response.data[0].fromEmail);
        setAwbNo1(response.data[0].airwayBill);
        setReceiverMobile(response.data[0].toMob);
        setReceiverName(response.data[0].toName);
        setToAddr(response.data[0].toAddr);
        setToPincode(response.data[0].toPincode);
        setToEmail(response.data[0].toEmail);
        
        setWeight(response.data[0].weight);
        setQuantity(response.data[0].quantity);
        setShipmentType(response.data[0].shipType);
        setAmount(response.data[0].amount);

        toast.success('AWB Found');
      } else {
        setAwbNo('');
        setCourierName('');
        setSenderMobile('');
        setSenderName('');
        setFromAddr('');
        setFromPincode('');
        setFromEmail('');
        setAwbNo1('');
        setReceiverMobile('');
        setReceiverName('');
        setToAddr('');
        setToPincode('');
        setToEmail('');
        
        setWeight('');
        setQuantity('');
        setShipmentType('');
        setAmount('');

        toast.error('No Airway Bill Found Book the Shipment');
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    fetchCurrentDateBookings();
  }, []); 
  useEffect(() => {
   
    if (courierName) {
    
      fetchData();
    }
  }, [courierName]);

const showAwb=async()=>{
 
 await fetchAwb();
 
 // fetchData();
}
 
  return (
    <div className="grid gap-2 p-2">
     

      {/* First Row */}
      <div className="grid grid-cols-3 gap-4">
       
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">AWB No:</label>
        <input
          type="text"
          value={awbNo}
          onChange={handleAwb}
          className="col-span-1 p-2 bg-gray-100 rounded shadow"
        />
       <button
        onClick={showAwb}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
       Search AWB
      </button>
      </div>

    
      <div className="p-4">
      <div ref={printRef}  className="border p-4 rounded  bg-white">
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          <img src={courierImg1} alt="Agency Logo" className="h-16"   />
          <div className="flex justify-center items-center">
            <Barcode value={awbNo1} format="CODE128" width={2} height={50} />
          </div>
          <img src={imgurl} alt="Courier Logo" className="h-16" 
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-lg font-semibold">
          <div>Date: {new Date().toLocaleDateString()}</div>
          
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            From, <br/>
            {senderName}<br />
            {fromAddr}<br />
            {fromPincode}<br />
            {senderMobile}<br />
            {fromEmail}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 text-lg font-bold">
            To, <br/>
            {receiverName}<br />
            {toAddr}<br />
            {toPincode}<br />
            {receiverMobile}<br />
            {toEmail}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4 text-lg font-semibold">
          <div>Shipment Type: {shipmentType}</div>
          <div>Weight : {weight}</div>
          <div>Quantity : {quantity}</div>
          <div>Amount : {amount}</div>
        </div>

        <div className="text-lg font-semibold text-center">
          {messageTxt}
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Download
      </button>
     
    </div>
    <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Today's Bookings</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Airway Bill</th>
              <th className="py-2 px-4 border-b">From Mobile</th>
              <th className="py-2 px-4 border-b">From Name</th>
              <th className="py-2 px-4 border-b">To Mobile</th>
              <th className="py-2 px-4 border-b">To Name</th>
              <th className="py-2 px-4 border-b">Courier Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{booking.createdAt}</td>
                <td className="py-2 px-4 border-b">{booking.airwayBill}</td>
                <td className="py-2 px-4 border-b">{booking.fromMob}</td>
                <td className="py-2 px-4 border-b">{booking.fromName}</td>
                <td className="py-2 px-4 border-b">{booking.toMob}</td>
                <td className="py-2 px-4 border-b">{booking.toName}</td>
                <td className="py-2 px-4 border-b">{booking.courierName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    
  );
};

export default AwbReport;
