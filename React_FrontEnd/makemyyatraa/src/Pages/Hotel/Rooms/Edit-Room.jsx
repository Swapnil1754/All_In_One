import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Container, Typography, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from "react";
import './Edit-Room.css';

const EditRoom = () => {
  const [room, setRoom] = useState({});
  useEffect(() => {
    const getRoom = async () => {
      try {
        const getRoomData = await AsyncStorage.getItem('room');
        const roomData = JSON.parse(getRoomData);
        setRoom(roomData);
      } catch (err) {
        console.log(err);
      }
    };
    getRoom();
  }, []);

  const imgUrl = process.env.REACT_APP_EDIT_ROOM_URL;
  const [imge, setImg] = useState();

  const imgHandle = (e) => {
    const imgData = e.target.files;
    setImg(imgData);
  };

  const submitImg = async (e) => {
    e.preventDefault();
    const regid = await AsyncStorage.getItem('regId');
    const formData = new FormData();

    for (const image of imge) {
      formData.append('files', image);
    }

    try {
      const response = await axios.put(`${imgUrl}/${regid}/${room.roomCatagory}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("room", response.data);
      setRoom(response.data);
      return response;
    } catch (error) {
      console.log("Error", error);
    }
  };
  const imageFun = (imagedata) => {
    const blob = new Blob([new Uint8Array(imagedata)], { type: 'image/*' });
    return URL.createObjectURL(blob);
  };

  return (
    <div>
      <h1>Edit Your Room</h1>
      <form>
        <div>
        <TextField className="TextField" placeholder="Room Id" variant="outlined" name="roomId" value={room.roomId} />
<TextField className="TextField" placeholder="Room Catagory" variant="outlined" name="roomCatagory" value={room.roomCatagory} />
<TextField className="TextField" placeholder="Room Type" variant="outlined" name="roomType" value={room.roomType} />
<TextField className="TextField" placeholder="Room Price" variant="outlined" name="price" value={room.price} />

<h2 className="Aminities">Aminities: </h2>

{room.aminitiesList &&
  room.aminitiesList.map((item, index) => (
    <div key={index}>
      <TextField className="TextField" variant="outlined" name="aminities" value={item} />
    </div>
  ))}

<h2 className="RoomImages">Room Images: </h2>

<div className="RoomImages">
  {room.images &&
    room.images.map((image, index) => (
      <div key={index}>
        <img src={imageFun(image)} alt={`Room Image ${index + 1}`} className="room-image" />
      </div>
    ))}
</div>

<h2 className="AddRoomImages">Add Room Images: </h2>

<input type="file" multiple onChange={(e) => imgHandle(e)} />
<Button onClick={(e) => submitImg(e)}>Save Images</Button>

        </div>
      </form>
    </div>
  );
};

export default EditRoom;
