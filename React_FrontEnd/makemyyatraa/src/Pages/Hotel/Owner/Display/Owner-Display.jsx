import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import HotelTable from "./HotelTable";
import './Owner-Display.css';

const OwnerDisplay = () => {
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const uri = process.env.REACT_APP_HOTEL_URL;
        const fetchData = async () => {
            try {
                const value = localStorage.getItem('ownerName');
                if (value) {
                    const response = await axios.get(`${uri}${value}`);
                    setHotelData(response.data);
                } else {
                    console.log("No Owner name");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const editHotel = (regId) => {
        try {
            localStorage.setItem('regId', regId);
            navigate('/hotel-profile');
        } catch (err) {
            console.log("Error...", err);
        }
    };

    const addHotel = () => {
        navigate('/add-hotel');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="owner-display-container">
            <UserProfile userData={userData} />
            {hotelData.length ? (
    <HotelTable hotelData={hotelData} editHotel={editHotel} />
) : (
    <div className="no-data">No hotels available. Click "Add New Hotel" to get started.</div>
)}

            <div className="buttons-container">
                <button className="add-hotel-button" onClick={addHotel}>Add New Hotel</button>
            </div>
        </div>
    );
};

export default OwnerDisplay;
