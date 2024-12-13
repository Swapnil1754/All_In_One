import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Common/Spinner/Spinner";
import '../CSS/Display-Hotel.css';
import { useNavigate } from "react-router-dom";
const DisplayHotel = () => {
    const [data, setData] = useState();
    const [laoding, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_GET_HOTEL_URL;
    useEffect(() => {
        const callApi = async () => {
            try {
            const value = localStorage.getItem('regId');
                if(value) {
                    const reaponse = await axios.get(url+`${value}`).then(async (val) => {
                        if(val) {
                            console.log("val", val.data);
                          setData(val.data);
                        } else{
                            console.log("No Data...");
                        }
                    }).catch((err) => console.log(err));
                    setLoading(false);
                } else{
                    console.log("error")
                    setLoading(false)
                }
            
            } catch(error) {
                console.log("Error", error)
            }
        }
        callApi();
    }, []);
    const decodeBase64Image = (base64String) => {
        const binaryData = atob(base64String);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }
        return URL.createObjectURL(new Blob([uint8Array]));
    };
    const imageData = {
        imgUrl: data?.image? decodeBase64Image(data.image):null
    }
    const imageFun = (imagedata) => {
        const blob = new Blob([new Uint8Array(imagedata)], { type: 'image/*' });
        return URL.createObjectURL(blob);
      };
    const confirmBooking = async(roomData) => {
      await localStorage.setItem('hotelName', data.hotelName);
      const rooM = JSON.stringify(roomData);
      await localStorage.setItem('roomData', rooM);
      navigate('/confirm-hotel-booking')
    }
      return (
        <div className="container">
          {laoding ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="header">
                <h2>{data.hotelName}</h2>
                <div className="">
                  <p>Ratings: {data.rating}</p>
                  <p>Location: {data.city}</p>
                </div>
              </div>
              <img className="hotel-image" src={imageData.imgUrl} alt="Hotel" />
              <h3>Rooms:</h3>
              <ul className="rooms-list">
                {data.rooms &&
                  data.rooms.map((room, index) => (
                    <li key={index} className="room-item">
                      <p>Category: {room.roomCategory}</p>
                      <button className="book-room-button" onClick={() => confirmBooking(room)}>Book Room</button>
                      <p>Type: {room.roomType}</p>
                      <p>Price Rs. {room.price}</p>
                      <h4>Images:</h4>
                      <div className="room-images">
                        {room.images &&
                          room.images.map((imgs, indx) => (
                            <img key={indx} src={imageFun(imgs)} alt={`Room ${indx + 1}`} />
                          ))}
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      );
      
}      
export default DisplayHotel;