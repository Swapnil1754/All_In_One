import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Owner-Display.css';
import { useNavigate } from "react-router-dom";
const OwnerDisplay = () => {
    const [hotelData, setHotelData] = useState([{
        ownerName: '',
        hotelName: '',
        rating: '',
        city: '',
        rooms: null,
        image: [],
    }]);
    const navigate = useNavigate();
    useEffect(() => {
        const uri = process.env.REACT_APP_HOTEL_URL;
        const callApi = async() => {
            try{
                await AsyncStorage.getItem('ownerName').then(async(value) => {
                    if(value) {
                        await axios.get(uri+`${value}`).then((data) => {
                            setHotelData(data.data);
                        }).catch((err) => console.log(err));
                    } else{
                        console.log("No Owner name")
                    }
                })
            } catch(error) {
                console.log(error);
            }
        }
        callApi()
    }, [])
    const editHotel = async(regId) => {
        console.log("reg", regId);
        await AsyncStorage.setItem('regId', regId).then(() => {
            navigate('/hotel-profile')
        }).catch(() => console.log("Error..."));
    }
    const addHotel = () => {
        navigate('/add-hotel')
    }
    return(
        <div className="owner-display-container">
            <table className="room-table">
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Ratings</th>
                        <th>City</th>
                        <th>Rooms</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotelData.map((items, index) => (
                        <tr>
                            <td>{items.hotelName}</td>
                            <td>{items.rating}</td>
                            <td>{items.city}</td>
                            <td>
                                {items.rooms !== null && items.rooms.map((item, ind) => (
                                    <ul key={ind}>
                                        <li>{item.roomCatagory}</li>
                                    </ul>
                                ))}
                            </td>
                            <td><button className="edit-room-button" onClick={() => editHotel(items.registrationId)}>Edit</button></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="edit-room-button" onClick={addHotel}>Add New Hotel</button>
        </div>
    )
}
export default OwnerDisplay;