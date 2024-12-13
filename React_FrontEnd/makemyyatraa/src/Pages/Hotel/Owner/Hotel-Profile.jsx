import axios from "axios";
import Room from "../Rooms/Room";
import React, { useEffect, useState } from "react";
import './Hotel-Profile.css'; // Import your custom CSS file for styling
import EditRoom from "../Rooms/Edit-Room";
import { useNavigate } from "react-router-dom";
import Toaster from "../../../Common/Toaster/Toaster";

const HotelProfile = () => {
    const [formData, setFormData] = useState({
        ownerName: '',
        hotelName: '',
        rating: '',
        city: '',
        rooms: [],
        image: [],
    });
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const deleteRoomUrl = process.env.REACT_APP_DELETE_ROOM_URL;
    const deleteHotelUrl = process.env.REACT_APP_DELETE_HOTEL_URL;
    const selectRoom = (room, event) => {
        event.preventDefault();
        try {
          const selectedRoomString = JSON.stringify(room);
          localStorage.setItem('room', selectedRoomString);
          navigate('/edit-room');
        } catch (error) {
          console.error('Error storing room:', error);
        }
      };
      
    useEffect(() => {
        const callApi = async () => {
            const regid = await localStorage.getItem('regId');
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
    const deleteRoom = async(roomId) => {
        const regid = await localStorage.getItem('regId');
        const response = await axios.put(deleteRoomUrl+`${regid}/${roomId}`);
        console.log("Room deletion", response.data);
        setFormData(response.data);
        return response.data;
    }
    const deleteHotel = async() => {
        const regid = await localStorage.getItem('regId');
        try {
        const response = await axios.delete(deleteHotelUrl+`${regid}`);
        // setFormData(response.data);
        setMessage("Hotel has been deleted successfully...!!!");
        setTimeout(() => {
            navigate('/owner-display');
        }, 3000)
        } catch(err) {
            console.log(err);
        }
    }
    const addRoom = async() => {
        await localStorage.setItem('registrationId',`${formData.registrationId}`);
        navigate("/add-room");
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
                                    <td>{item.roomCategory}</td>
                                    <td>{item.roomType}</td>
                                    <td>Rs.{item.price}</td>
                                    <td>
                                        <ul>
                                            {item.aminitiesList.map((aminity, ind) => (
                                                <li key={ind}>{aminity}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td><button className="edit-room-button" onClick={(e) => selectRoom(item, e)}>Add Images</button>
                                    <button className="delete-room-button" onClick={() => deleteRoom(item.roomId)}>Delete Room</button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                    <button className="add-room-button" onClick={addRoom}>Add New Room</button>
                    <button className="delete-room-button" onClick={deleteHotel}>Delete Hotel</button>
                </div>
            </div>
            <Toaster message={message} />
        </div>
    );
}

export default HotelProfile;
