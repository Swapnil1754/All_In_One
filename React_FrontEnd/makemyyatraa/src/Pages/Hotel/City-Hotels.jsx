import React, { useEffect, useState } from "react";
import '../CSS/City-Hotels.css';
import { Typography, TextField, Button, Grid, Checkbox } from '@mui/material';
import Cards from "../../Common/Cards/Cards";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
const CityHotels = () => {
    const [hotelData, setHotelData] = useState([]);
    const [cityData, setCitydata] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const url = process.env.REACT_APP_GET_HOTEL_BY_CITY_URL;
        const callApi = () => {
            try {
                AsyncStorage.getItem("cityName").then(async (value) => {
                    if(value) {
                        await axios.get(url+`${value}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }).then(async (response) => {
                            setHotelData(await response.data);
                            setCitydata(value);
                        })
                    } else {
                        console.log("Value is not available");
                    }
                })
            } catch(error) {
                console.log("Error", error);
            }
        }
        callApi();
    }, []);
    const trial = (e) => {
        AsyncStorage.setItem('regId', e.registrationId)
        .then(() => { console.log("Data Saved Successfull...!!!")})
        .catch((error) => {console.log("Data Saving Failed...!!!")});
        navigate('/display-hotel')
    }
    return(
        <Grid>
            <Typography variant="h5" align="center" gutterBottom>Showing Results for {cityData}</Typography>
        <div className="card-container">
            {hotelData.map((item, index) => (
                <div key={index} onClick={() => trial(item)}>
                    <Cards title={item.hotelName} imgUrl={item.image} ratings={item.rating} disc={item.city} />
                </div>
            ))}
        </div>
        </Grid>
    )
}
export default CityHotels;