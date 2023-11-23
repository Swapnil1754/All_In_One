import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Room from "../Rooms/Room";
import React, { useEffect, useState } from "react";
import './Hotel-Profile.css'; // Import your custom CSS file for styling
import EditRoom from "../Rooms/Edit-Room";
import { useNavigate } from "react-router-dom";

const HotelProfile = () => {
    const [formData, setFormData] = useState({
        ownerName: '',
        hotelName: '',
        rating: '',
        city: '',
        rooms: [],
        image: [],
    });
    const navigate = useNavigate();
    const selectRoom = (room, event) => {
        event.preventDefault();
        try {
          const selectedRoomString = JSON.stringify(room);
          AsyncStorage.setItem('room', selectedRoomString);
          navigate('/edit-room');
        } catch (error) {
          console.error('Error storing room:', error);
        }
      };
      
    useEffect(() => {
        const callApi = async () => {
            const regid = await AsyncStorage.getItem('regId');
            // const regid = '0D72924';
            const uri = process.env.REACT_APP_GET_HOTEL_URL;
            try {
                await axios.get(uri + `${regid}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((value) => {
                    if (value) {
                        console.log("value", value.data);
                        setFormData(value.data);
                    } else {
                        console.log("No FormData")
                    }
                }).catch((err) => console.log(err))
            } catch (err) {
                console.log(err);
            }
        }
        callApi();
    }, []);

    const decodeBase64Image = (base64String) => {
        console.log("dfsdf", base64String);
        const binaryData = atob(base64String);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }
        return URL.createObjectURL(new Blob([uint8Array]));
    };

    const imgData = {
        imgUrl: decodeBase64Image(formData.image)
    }

    return (
        <div className="hotel-profile-container">
            <img src={imgData.imgUrl} alt={`${formData.hotelName} Hotel`} className="hotel-image" />
            <div className="hotel-details">
                <h2 className="hotel-name">{formData.hotelName}</h2>
                <p className="hotel-rating">Rating: {formData.rating}</p>
                <div className="room-list">
                    
                    <table className="room-table">
                        <thead>
                            <tr>
                                <th>Room Category</th>
                                <th>Room Type</th>
                                <th>Price</th>
                                <th>Amenities</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.rooms.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.roomCatagory}</td>
                                    <td>{item.roomType}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <ul>
                                            {item.aminitiesList.map((aminity, ind) => (
                                                <li key={ind}>{aminity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td><button className="edit-room-button" onClick={(e) => selectRoom(item, e)}>Add Room Images</button>
                                    <button className="delete-room-button">Delete Room</button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                    <button className="add-room-button">Add New Room</button>
                </div>
            </div>
        </div>
    );
}

export default HotelProfile;
