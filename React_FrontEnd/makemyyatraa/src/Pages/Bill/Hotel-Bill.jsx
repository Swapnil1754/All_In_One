import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import './Hotel-Bill.css';
const HotelBill = () => {
    const [hotelName, setHotelName] = useState();
    const [hotelBill, setHotelBill] = useState();
    useEffect(() => {
        const getData = async() => {
        AsyncStorage.getItem('hotelName').then((value) => {
            if(value) {
                setHotelName(value)
            }
        }).catch((error) => console.log("Hotel Name not available..."));
        AsyncStorage.getItem('hotelBill').then((val) => {
            if(val) {
                const hotelData = JSON.parse(val);
                console.log("hotel Bill", hotelData);
                setHotelBill(hotelData);
            }
        }).catch((err) => console.log(err));
    }
    getData();
    }, [])
    return(
        <div className="bill-container">
      <div className="bill-header">
        <img src="/AllInOne_logo.png" alt=""className="logo" />
        <h1>{hotelName}</h1>
        <p>Booking Reciept</p>
      </div>

      {hotelBill && (
        <>
          <div className="bill-details">
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
              <span>Number of Adults:</span>
              <span>{hotelBill.noOfPeoples}</span>
            </div>
            <div className="detail-row">
              <span>Number of Rooms:</span>
              <span>{hotelBill.noOfrooms}</span>
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
    );

}
export default HotelBill;