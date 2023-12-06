import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import './Hotel-Bill.css';
import html2pdf from 'html2pdf.js';
import axios from "axios";
const HotelBill = () => {
    const [hotelName, setHotelName] = useState();
    const [hotelBill, setHotelBill] = useState();
    const [bill, setBill] = useState({
        hotelName: '',
        roomCatagory: '',
        roomType: '',
        fromDate: '',
        toDate: '',
        noOfPeoples: '',
        noOfRooms: '',
        noOfDays: '',
        cost: '',
    });
    const billGenerateUrl = process.env.REACT_APP_HOTEL_BOOKING_BILL_GENERATOR;
    useEffect(() => {
        const getData = async () => {
          try {
            const storedHotelName = await AsyncStorage.getItem('hotelName');
            if (storedHotelName) {
              setHotelName(storedHotelName);
            }
    
            const storedHotelBill = await AsyncStorage.getItem('hotelBill');
            if (storedHotelBill) {
              const hotelData = JSON.parse(storedHotelBill);
              const hotlName = storedHotelName || '';
              setBill({
                ...bill,
                hotelName: hotlName,
                roomCatagory: hotelData.roomCatagory,
                roomType: hotelData.roomType,
                fromDate: hotelData.fromDate,
                toDate: hotelData.toDate,
                noOfPeoples: hotelData.noOfPeoples,
                noOfRooms: hotelData.noOfRooms, 
                noOfDays: hotelData.noOfDays,
                cost: hotelData.cost
              });
        }
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };
    
        getData();
      }, []);
      useEffect(() => {
        const callApi = async() => {
            if(bill.hotelName != '') {
                console.log("billData", bill)
              const response = await axios.post(billGenerateUrl, bill, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
              }).then((valu) => {
                console.log("Final", valu.data);
                setHotelBill(valu.data)
              }).catch((er) => console.log("err", er));
              return response;
            }
        }
        callApi();
      }, [bill]);
      const downloadPdf = () => {
        const element = document.getElementById('bill-data');
        html2pdf(element);
      }
    return(
        <div className="bill-container">
            <div className="bill-container" id="bill-data">
      <div className="bill-header">
        <img src="/AllInOne_logo.png" alt=""className="logo" />
        <h1>{bill.hotelName}</h1>
        <p>Booking Reciept</p>
      </div>

      {hotelBill && (
        <>
          <div className="bill-details">
          <div className="detail-row">
              <span>Booking Id: </span>
              <span>{hotelBill.bookingId}</span>
              </div>
          <div className="detail-row">
              <span>Room Catagory:</span>
              <span>{hotelBill.roomCatagory}</span>
            </div>
            <div className="detail-row">
              <span>Room Type:</span>
              <span>{hotelBill.roomType}</span>
            </div>
            <div className="detail-row">
              <span>Check-in Date:</span>
              <span>{hotelBill.fromDate}</span>
            </div>
            <div className="detail-row">
              <span>Check-out Date:</span>
              <span>{hotelBill.toDate}</span>
            </div>
            <div className="detail-row">
              <span>No of Days:</span>
              <span>{hotelBill.noOfDays}</span>
            </div>
            <div className="detail-row">
              <span>Number of Adults:</span>
              <span>{hotelBill.noOfPeoples}</span>
            </div>
            <div className="detail-row">
              <span>Number of Rooms:</span>
              <span>{hotelBill.noOfRooms}</span>
            </div>
          </div>

          <div className="bill-total">
            <div className="detail-row">
              <span>Total Amount:</span>
              <span>{hotelBill.cost} INR</span>
            </div>
          </div>
        </>
      )}

      <div className="bill-footer">
        <p>Thank you for choosing {hotelName}! We hope you have a pleasant stay.</p>
      </div>
      </div>
      <button onClick={downloadPdf}>Download Payment Receipt</button>
    </div>
    );

}
export default HotelBill;