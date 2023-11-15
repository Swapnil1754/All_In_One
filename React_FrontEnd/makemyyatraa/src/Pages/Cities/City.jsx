import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../../Common/Cards/Cards";
import { Typography, TextField, Button, Grid, Checkbox } from '@mui/material';
import '../CSS/City.css';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
const City = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    const cityUrl = process.env.REACT_APP_GET_ALL_CITIES_URL;
    const callApi = async () => {
        try {
        const response = await axios.get(cityUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        setData(response.data);
        return response;
    } catch(error) {
        console.log("Error", error);
    }
    }
    callApi();
}, []);
const hotelsByCity = (e) => {
    AsyncStorage.setItem("cityName", e.cityName).then(() => console.log("City name Saved..")).catch(() => console.log("Error while saving City Name..."))
console.log("e", e.cityName);
navigate("/city-hotels")
}
    return(
        <Grid>
        <Typography variant="h5" align="center" gutterBottom>Trending Destinations In India...</Typography>
        <div className="card-container">
            {data.map((item, index) => (
                <div key={index} onClick={(e) => hotelsByCity(item)}>
                    <Cards title={item.cityName} imgUrl={item.cityImage} disc={item.state} />
                </div>
            ))}
        </div>
        </Grid>
    )
}
export default City;