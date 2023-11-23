import React, { useState } from "react";
import Room from "./Room";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import './AddRoom.css'; // Import your custom CSS file for styling
import { useNavigate } from "react-router-dom";
import Toaster from "../../../Common/Toaster/Toaster";

const AddRoom = () => {
    const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState([
    { roomCatagory: '', roomType: '', price: '', aminitiesList: [], images: [] },
  ]);
  const [message, setMessage] = useState();
  const url = process.env.REACT_APP_ADD_ROOM_URL;

  const addRoom = () => {
    setRoomsList([...roomsList, { roomCatagory: '', roomType: '', price: '', aminitiesList: [], images: [] }]);
  }

  const handleSubmit = async () => {
    await AsyncStorage.getItem('registrationId').then(async (value) => {
      await callApi(value);
      setMessage("Rooms Saved Successfully...!!!");
      setTimeout(() => {
        navigate('/owner-display');
      }, 5000)
      
    }).catch((error) => console.log("Error while Putting..", error))
  }

  const callApi = async (roomId) => {
    console.log("Rooms2", roomId);
    const form = new FormData();
    form.append('data', JSON.stringify(roomsList));
    const response = await axios.put(url + `${roomId}/add-room`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response;
  }

  const handleRoomChange = (updatedRoom, index) => {
    const updatedRooms = [...roomsList];
    updatedRooms[index] = updatedRoom;
    setRoomsList(updatedRooms);
  }

  return (
    <div className="add-room-container">
      <h2>Add Rooms to Your Hotel</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Category</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Amenities</th>
          </tr>
        </thead>
        <tbody>
          {roomsList.map((item, index) => (
            <Room key={index} room={item} onChange={(updatedRoom) => handleRoomChange(updatedRoom, index)} />
          ))}
        </tbody>
      </table>
      <button className="add-room-button" onClick={addRoom}>Add Room</button>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <Toaster message={message} />
    </div>
  );
}

export default AddRoom;
