import React, { useCallback, useState, useEffect,useRef } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
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


const Booking = () => {
  const location = useLocation();
  const printRef = useRef();
  const senderNameRef = useRef(null);
  const senderAddrRef = useRef(null);
  const senderPinRef = useRef(null);
  const senderEmailRef = useRef(null);
  const recvMobRef = useRef(null);
  const recvNameRef = useRef(null);
  const recvAddrRef = useRef(null);
  const recvPinRef = useRef(null);
  const recvEmailRef = useRef(null);
  const sType = useRef(null);
  const sWeight = useRef(null);
  const sQty = useRef(null);
  const sAwb = useRef(null);
  const sAmount = useRef(null);
  const { courierImg, courierName, courierSite } = location.state || {}; // Destructure the received state
  const messageTxt = 'Thank you.. Further Tracking Details Please visit ' + courierSite;
  const cDate1 = new Date();
  const fDate1 = `${cDate1.getDate()}/${cDate1.getMonth() + 1}/${cDate1.getFullYear()}`;
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [awbNo, setAwbNo] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [fromPincode, setFromPincode] = useState('600001');
  const [fromEmail, setFromEmail] = useState('rkayentp@gmail.com');
  const [fromAddr, setFromAddr] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [toPincode, setToPincode] = useState('600001');
  const [toEmail, setToEmail] = useState('rkayentp@gmail.com');
  const [shipmentType, setShipmentType] = useState('DOX');
  const [quantity, setQuantity] = useState('1');
  const [weight, setWeight] = useState('0.100');
  const [amount, setAmount] = useState('0.00');
  const [imgurl, setImgurl] = useState('');
  const [mediaurl, setMediaurl] = useState('');
  
  const [instanceID, setInstanceID] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [dataFound, setDataFound] = useState(false);
  
  
  // const dummyEmail1="";
  // const dummyEmail2="";
  //const url = "http://localhost:5000/";
  const url ="https://api-services-jg4f.onrender.com/";
  const navigate =useNavigate();
  // Function to fetch data for sender's address
  
  const fetchMobno = async () => {
    try {
      const response = await axios.get(`${url}api/customer/search?field[]=custMob&value[]=${senderMobile}`);
      setFromAddr(response.data[0].custAddr); // Ensure default value if response data is empty
      setSenderName(response.data[0].custName);
      setFromPincode(response.data[0].custPincode);
      setFromEmail(response.data[0].custEmail);
      setDataFound(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFromAddr(''); // Ensure default value if response data is empty
      setSenderName('');
      setFromPincode('600001');
      setFromEmail('xyz@gmail.com');
      setDataFound(false);
    }
  };
  const fetchRMobno = async () => {
    try {
      const response = await axios.get(`${url}api/customer/search?field[]=custMob&value[]=${receiverMobile}`);
      setToAddr(response.data[0].custAddr); // Ensure default value if response data is empty
      setReceiverName(response.data[0].custName);
      setToPincode(response.data[0].custPincode);
      setToEmail(response.data[0].custEmail);
      setDataFound(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setToAddr(''); // Ensure default value if response data is empty
      setReceiverName('');
      setToPincode('600001');
      setToEmail('xyz@gmail.com');

      setDataFound(false);
    }
  };

  // Use useEffect to trigger fetchMobno when input length is 10
  useEffect(() => {
    if (senderMobile.length === 10) {
      fetchMobno();
    }
  }, [senderMobile]);
  useEffect(() => {
    if (receiverMobile.length === 10) {
      fetchRMobno();
    }
  }, [receiverMobile]);


  // Fetch agency data on component mount
  const fetchData=()=>{
    if(courierName==="Amazon"){
      setImgurl(amazon);
    }else if(courierName==="Aramex"){
      setImgurl(aramex);
    }else if(courierName==="Bluedart"){
      setImgurl(bluedart);
    }else if(courierName==="Delhivery"){
      setImgurl(delhivery);
    }else if(courierName==="DHL"){
      setImgurl(dhl);
    }else if(courierName==="DTDC Courier"){
      setImgurl(dtdc);
    }else if(courierName==="Ecom"){
      setImgurl(ecom);
    }else if(courierName==="Ekart"){
      setImgurl(ekart);
    }else if(courierName==="Fedex"){
      setImgurl(fedex);
    }else if(courierName==="Franch"){
      setImgurl(franch);
    }else if(courierName==="Movin"){
      setImgurl(movin);
    }else if(courierName==="The Professional Courier"){
      setImgurl(professional);
    }else if(courierName==="ST Courier"){
      setImgurl(stcourier);
    }else if(courierName==="Trackon"){
      setImgurl(trackon);
    }else if(courierName==="XpressBees"){
      setImgurl(xpressbees);
    }else{
      setImgurl(courierImg1);
    }

  }
  useEffect(() => {
    fetchData();
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}api/profile`);
      setInstanceID(response.data[0].instanceId);
      setAccessToken(response.data[0].accessToken);
      } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('You will face Error in WhatsApp Message');
    }
  };
  const handleClick = async () => {
    try {
      const cDate = new Date();
      const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/AirwayBill.png';
      const fDate = `${cDate.getDate()}/${cDate.getMonth() + 1}/${cDate.getFullYear()}`;
      const messageText = "Thank You for using Dingdong Courier. %0A Sender: "+senderName+"%0A Your Awb No: "+awbNo+"%0A Send Via:" + courierSite+ " %0A Dated: "+fDate+" %0A To: "+receiverName+"%0A Have a Nice Day...."; 
      const response = await fetch(`https://bot.betablaster.in/api/send?number=91${senderMobile}&type=media&message=${messageText}&media_url=${media_url}&instance_id=${instanceID}&access_token=${accessToken}`, {
        method: 'GET',
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('Error sending message:', error);
     
    }
  };
  const handleClick1 = async () => {
    try {
      const cDate = new Date();
      const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/AirwayBill.png';
      const fDate = `${cDate.getDate()}/${cDate.getMonth() + 1}/${cDate.getFullYear()}`;
      const messageText = "Thank You for using Dingdong Courier. %0A Sender: "+senderName+"%0A Your Awb No: "+awbNo+"%0A Send Via:" + courierSite+ " %0A Dated: "+fDate+" %0A To: "+receiverName+"%0A Have a Nice Day...."; 
      const response = await fetch(`https://bot.betablaster.in/api/send?number=91${receiverMobile}&type=media&message=${messageText}&media_url=${media_url}&instance_id=${instanceID}&access_token=${accessToken}`, {
        method: 'GET',
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('Error sending message:', error);
     
    }
  };
  const handleSenderMobileChange = (e) => {
    setSenderMobile(e.target.value);
    // if (e.target.value.length === 10) {
    //   senderNameRef.current.focus();
    // }
  };
  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderNameRef.current.focus();
    }
  };
  const handleSNamePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderAddrRef.current.focus();
    }
  };
  const handleSAddrPress = (e) => {
    if (( e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderPinRef.current.focus();
    }
  };
  const handleSPinPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderEmailRef.current.focus();
    }
  };
  const handleSEmailPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvMobRef.current.focus();
    }
  };
  const handleRMobPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvNameRef.current.focus();
    }
  };
  const handleRNamePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvAddrRef.current.focus();
    }
  };
  const handleRAddrPress = (e) => {
    if (( e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvPinRef.current.focus();
    }
  };
  const handleRPinPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvEmailRef.current.focus();
    }
  };
  const handleREmailPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sType.current.focus();
    }
  };
  const handlesTypePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sWeight.current.focus();
    }
  };
  const handlesWeightPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sQty.current.focus();
    }
  };
  const handlesQtyPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sAmount.current.focus();
    }
  };
  const handlesAmountPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sAwb.current.focus();
    }
  };
  const handleReceiverMobileChange = (e) => {
    setReceiverMobile(e.target.value);
  };
  const saveCustomer=async()=>{
   try {
    const response = await axios.post(`${url}api/customer`,{
        custName:senderName,
        custMob:senderMobile,
        custEmail:fromEmail,
        custAddr:fromAddr,
        custPincode:fromPincode
      });
      toast.success(`Saved ${senderName} Successfully..`);
   } catch (error) {
    toast.error(error.message);
   }
  }
  const saveCustomer1=async()=>{
    try {
     const response = await axios.post(`${url}api/customer`,{
         custName:receiverName,
         custMob:receiverMobile,
         custEmail:toEmail,
         custAddr:toAddr,
         custPincode:toPincode
       });
       toast.success(`Saved ${receiverName} Successfully..`);
    } catch (error) {
     toast.error(error.message);
    }
   }
   const saveBooking=async()=>{
   
    const dummyEmail1 = fromEmail === "" ? "--@--" : fromEmail;
    const dummyEmail2 = toEmail === "" ? "--@--" : toEmail;
    
    try {
     const response = await axios.post(`${url}api/booking`,{
         toName:receiverName,
         toMob:receiverMobile,
         toEmail:dummyEmail2,
         toAddr:toAddr,
         toPincode:toPincode,
         fromName:senderName,
         fromMob:senderMobile,
         fromEmail:dummyEmail1,
         fromAddr:fromAddr,
         fromPincode:fromPincode,
         airwayBill:awbNo,
         weight:weight,
         quantity:quantity,
         shipType:shipmentType,
         amount:amount,
         courierName:courierName
       });
       downloadImage();
       toast.success(`Shipment Booked ${awbNo} Successfully..`);
       setReceiverMobile('');
       setFromPincode('600001');
       setSenderName('');
       setAwbNo('');
       setReceiverName('');
       setSenderMobile('');
       setFromAddr('');
       setToAddr('');
       setFromEmail('xyz@mail.com');
       setToPincode('600001');
       setToEmail('xyz@mail.com');
       setShipmentType('DOX');
       setWeight('0.100');
       setQuantity('1');
       setAmount('0.00');
       
       
    } catch (error) {
     toast.error(error.message);
    }
   }
   const saveBooking1=async()=>{
    const dummyEmail1 = fromEmail === "" ? "--@--" : fromEmail;
    const dummyEmail2 = toEmail === "" ? "--@--" : toEmail;
    generateImage();
    await new Promise(resolve => setTimeout(resolve, 5000));
    handleClick();
    handleClick1();
    try {
     const response = await axios.post(`${url}api/booking`,{
         toName:receiverName,
         toMob:receiverMobile,
         toEmail:dummyEmail2,
         toAddr:toAddr,
         toPincode:toPincode,
         fromName:senderName,
         fromMob:senderMobile,
         fromEmail:dummyEmail1,
         fromAddr:fromAddr,
         fromPincode:fromPincode,
         airwayBill:awbNo,
         weight:weight,
         quantity:quantity,
         shipType:shipmentType,
         amount:amount,
         courierName:courierName
       });
       toast.success(`Shipment Booked ${awbNo} Successfully..`);
       setReceiverMobile('');
       setFromPincode('600001');
       setSenderName('');
       setAwbNo('');
       setReceiverName('');
       setSenderMobile('');
       setFromAddr('');
       setToAddr('');
       setFromEmail('xyz@mail.com');
       setToPincode('600001');
       setToEmail('xyz@mail.com');
       setShipmentType('DOX');
       setWeight('0.100');
       setQuantity('1');
       setAmount('0.00');
       
       
    } catch (error) {
     toast.error(error.message);
    }
   }
   const downloadImage = async() => {
    if (printRef.current) {
      try {
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('AirwayBill.pdf');

        toast.success('Downloaded');
      } catch (error) {
        console.error('Failed to generate PDF:', error);
        toast.error('Failed to download the PDF');
      }
    }
  }
  const generateImage = async () => {
    const url1="https://awsupload.onrender.com/";
    if (printRef.current) {
      try {
        // Step 1: Generate the image using html2canvas
        const canvas = await html2canvas(printRef.current);
        
        // Step 2: Convert the canvas to a Blob object
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  
        // Step 3: Create a FormData object and append the Blob
        const formData = new FormData();
        formData.append("file", blob, "AirwayBill.png");
  
        // Step 4: Upload the file using axios.post
        const response = await axios.post(`${url1}upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Step 5: Process the response (assuming the response contains the file URL)
        console.log(response.data);
        setMediaurl(response.data);
        toast.success("Image generated and file uploaded successfully");
        
      } catch (error) {
        toast.error("Failed to generate image or upload file");
        console.error(error);
      }
    }
   
   
  };
  

  
  const handleAwb = (e) => {
    const value = e.target.value;
    setAwbNo(value);
    if (value.length > 0) {
      fetchAwb(); // Fetch the AWB to validate if it is unique
    }
  };
  const fetchAwb = async () => {
    try {
      const response = await axios.get(`${url}api/booking/search?field[]=airwayBill&value[]=${awbNo}`);
      if (response.data.length > 0) {
        
        setIsButtonVisible(false);
        toast.error('AWB Already Booked. Enter New Awb');
      } else {
        setIsButtonVisible(true);
      }
    } catch (error) {
      console.error('Error checking AWB:', error);
      toast.error('Error fetching AWB data');
    }
  };


  useEffect(() => {
    if (awbNo) {
      fetchAwb();
    }
  
  }, [awbNo]);
  
 
  return (
    <div className="grid gap-2 p-2">
      {/* Top Row */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <img src={courierImg1} alt="Courier" className="w-full h-full object-contain" />
        <div className="flex justify-center items-center">
          <Barcode value={awbNo || date} format="CODE128" width={2} height={50} />
        </div>
        <img src={courierImg} alt="Courier" className="w-80 h-30 " />
      </div>

      {/* First Row */}
      <div className="grid grid-cols-6 gap-4">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="col-span-2 p-2 bg-gray-100 rounded shadow"
        />
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">AWB No:</label>
        <input
          type="text"
          value={awbNo}
          onChange={handleAwb}
          className="col-span-2 p-2 bg-gray-100 rounded shadow"
          ref={sAwb}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-6 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Sender Mobile No:</label>
        <div className="col-span-2 flex gap-2 items-center">
          <input
            type="text"
            value={senderMobile}
            onChange={handleSenderMobileChange}
            className="w-full p-2 bg-gray-100 rounded shadow"
            maxLength={10}
            onKeyDown={handleKeyPress}
          />
          {dataFound ? (
            <button className="bg-gray-500 text-white p-2 rounded shadow" disabled>
              +
            </button>
          ) : (
            <button className="bg-blue-500 text-white p-2 rounded shadow" onClick={saveCustomer}>
            +
            </button>
          )}
        </div>
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Receiver Mobile No:</label>
        <div className="col-span-2 flex gap-2 items-center">
          <input
            type="text"
            value={receiverMobile}
            onChange={handleReceiverMobileChange}
            className="w-full p-2 bg-gray-100 rounded shadow"
            maxLength={10}
            ref={recvMobRef}
            onKeyDown={handleRMobPress}
          />
          {dataFound ? (
            <button className="bg-gray-500 text-white p-2 rounded shadow" disabled>
             +
            </button>
          ) : (
            <button className="bg-blue-500 text-white p-2 rounded shadow" onClick={saveCustomer1}>
              +
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Sender Name:</label>
        <div className="col-span-2 flex gap-2 items-center">
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded shadow"
            ref={senderNameRef} 
            onKeyDown={handleSNamePress}
          />
        
        </div>
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Receiver Name:</label>
        <div className="col-span-2 flex gap-2 items-center">
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="w-full p-2 bg-gray-100 rounded shadow"
            ref={recvNameRef}
            onKeyDown={handleRNamePress} 
          />
        
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-6 gap-4">
        <textarea
          value={fromAddr}
          onChange={(e) => setFromAddr(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          rows="2"
          ref={senderAddrRef} 
          onKeyDown={handleSAddrPress}
        />
        <textarea
          value={toAddr}
          onChange={(e) => setToAddr(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          rows="2"
          ref={recvAddrRef}
          onKeyDown={handleRAddrPress} 
        />
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-8 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">From Pincode:</label>
        <input
          type="text"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={senderPinRef}
          onKeyDown={handleSPinPress}
        />
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">To Pincode:</label>
        <input
          type="text"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={recvPinRef}
          onKeyDown={handleRPinPress}
        />
      </div>

      <div className="grid grid-cols-8 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">From Email:</label>
        <input
          type="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={senderEmailRef}
          onKeyDown={handleSEmailPress}
        />
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">To Email:</label>
        <input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={recvEmailRef}
          onKeyDown={handleREmailPress}
        />
      </div>

      {/* Fifth Row */}
      <div className="grid grid-cols-8 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Shipment Type:</label>
        <input
          type="text"
          value={shipmentType}
          onChange={(e) => setShipmentType(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={sType}
          onKeyDown={handlesTypePress}
        />
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={sQty}
          onKeyDown={handlesQtyPress}
        />
      </div>

      <div className="grid grid-cols-8 gap-4 items-center">
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={sWeight}
          onKeyDown={handlesWeightPress}
        />
        <label className="col-span-1 p-2 bg-gray-100 rounded shadow">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="col-span-3 p-2 bg-gray-100 rounded shadow"
          ref={sAmount}
          onKeyDown={handlesAmountPress}
        />
      </div>

      {/* Sixth Row */}
      <div className="grid grid-cols-2 gap-4 items-center">
        <input
          type="text"
          value={messageTxt}
          readOnly
          className="w-full p-2 bg-gray-100 rounded shadow text-center"
        />
        {isButtonVisible && ( 
          <div className='grid grid-cols-2 gap-4 items-center'>
        <button className="bg-blue-500 text-white p-2 rounded shadow" onClick={saveBooking1}> Save & Send </button>
        <button className="bg-blue-500 text-white p-2 rounded shadow" onClick={saveBooking}> Save & Print </button>
        </div>
        )}
        </div>
      <div className="p-4 ">
      <div ref={printRef}  className="border-2 border-black border-solid  p-4 rounded  bg-white">
        <div className="border-2 border-black border-solid grid grid-cols-3 gap-4 items-center mb-2">
          <img src={courierImg1} alt="Agency Logo" className="h-16"   />
          <div className="border-2 border-black border-solid flex justify-center items-center">
            <Barcode value={awbNo} format="CODE128" width={2} height={50} />
          </div>
          <img src={imgurl} alt="Courier Logo" className="h-16" 
          />
        </div>

        <div className=" grid grid-cols-3 gap-4 mb-2 text-lg font-semibold">
          <div>Date: {fDate1}</div>
          
        </div>

        <div className="grid grid-cols-2 gap-4  text-sm mb-2">
          <div className='border-2 border-black border-solid'>
            <div>
            From, <br/>
            {senderName}<br />
            {fromAddr}<br />
            {fromPincode}<br />
            {senderMobile}<br />
            {fromEmail}
            </div>
          </div>
          
          <div className='border-2 border-black border-solid text-2xl font-bold mb-2'>
            <div>
            To, <br/>
            {receiverName}<br />
            {toAddr}<br />
            {toPincode}<br />
            {receiverMobile}<br />
            {toEmail}
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-4 gap-4 text-lg font-semibold mb-2">
          
          <div className='border-2 border-black border-solid'>Shipment Type: {shipmentType}</div>
          <div className='border-2 border-black border-solid'>Weight : {weight}</div>
          <div className='border-2 border-black border-solid'>Quantity : {quantity}</div>
          <div className='border-2 border-black border-solid'>Amount : {amount}</div>
       
        </div>

        <div className="border-2 border-black border-solid mb-2 text-lg font-semibold text-center">
          <div>
          {messageTxt}
          </div>
        </div>
      </div>
      {/* <button
        onClick={generateImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Generate Image
      </button> */}
     
    </div>
    </div>
    
    
  );
};

export default Booking;
