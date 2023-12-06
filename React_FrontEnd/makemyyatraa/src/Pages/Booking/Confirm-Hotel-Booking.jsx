import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../Booking/Confirm-Hotel-Booking.css';
import axios from 'axios';
import  Razorpay from 'react-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Common/Spinner/Spinner';
import { differenceInDays } from 'date-fns';
const ConfirmBooking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [orderId, setOrderId] = useState();
  const [room, setRoom] = useState();
  const [cost, setCost] = useState();
  const [noOfDays, setnoOfDays] = useState(0);
  const navigate = useNavigate();
const paymentUrl = process.env.REACT_APP_INITIATE_PAYMENT_URL;
const hotelBill = {
  roomCatagory: room && room.roomCatagory,
  roomType: room && room.roomType,
  fromDate: startDate,
  toDate: endDate,
  noOfPeoples: adults,
  noOfDays: noOfDays,
  noOfRooms: rooms,
  cost: '',
}
useEffect(() => {
  const getRoom = () => {
       AsyncStorage.getItem('roomData').then(async(value) => {
          const roomData = await JSON.parse(value);
          setRoom(roomData);
      }).catch((err) => console.log(err));
  }
  getRoom();
}, [])
  const handleConfirm = async () => {
    const days = differenceInDays(endDate, startDate);
    setnoOfDays(days);
    const formData = new FormData();
    formData.append("amount", JSON.stringify(room.price*rooms*days));
    formData.append("currency", "INR");
    try{
    await axios.post(paymentUrl, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async(value) => {
        if(value) {
            console.log("value", value.data)
            setOrderId(value.data.id);
            if(value.data.status === 'created') {
                const options = {
                    key: 'rzp_test_hFzB6xsAnc60ru',
                    amount: value.data.amount,
                    currency: 'INR',
                    name: 'AllInOne.com',
                    description: 'Payment for a booking',
                    image: '/AllInOne_logo.png',
                    order_id: orderId,
                    handler: function(response) {
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_order_id);
                        console.log(response);
                        console.log("Payment Successful !!!");
                        setTimeout(() => {
                          const amt = value.data.amount/100;
                          setCost(amt);
                          const billData = {...hotelBill, cost: amt,}
                        AsyncStorage.setItem('hotelBill', JSON.stringify(billData)).then(() => {
                          navigate('/hotel-bill')
                        }).catch((err) => console.log(err))
                        }, 1000);
                    },
                    prefill:{
                        name: '',
                        email: '',
                        contact: '',
                      },
                      notes:{
                        example_note_key: 'example_value',
                      },
                      theme:{ color: '#P37254' },
                };
            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed",
            function(response) {
                console.log(response.error.code);;
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
            });
            rzp.open();
            }
        }
    })
} catch(err){
    console.error("Error initiating payment:", err);
} 
  };

  const handleCancel = () => {
    console.log('Booking Canceled!');
  };
  return (
    <div className="confirm-booking-container">
      <h2>Confirm Your Booking</h2>
      <div>
  {room && <span>Room Category: {room.roomCatagory}</span>}
  <br />
  {room && <span>Room Type: {room.roomType}</span>}
</div>

      <div className="date-picker-container">
        <label>Check-in Date:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>

      <div className="date-picker-container">
        <label>Check-out Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className="input-container">
        <label>Number of Adults:</label>
        <input type="number" value={adults} onChange={(e) => setAdults(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Number of Rooms:</label>
        <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
      </div>
      <div className="button-container">
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm Booking
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        
      </div>
    </div>
  );
};

export default ConfirmBooking;
