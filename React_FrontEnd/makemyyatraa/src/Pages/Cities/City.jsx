import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CityCards from "../../Common/Cards/City-Cards";
import '../CSS/City.css';

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
            } catch (error) {
                console.log("Error", error);
            }
        }
        callApi();
    }, []);

    const hotelsByCity = (e) => {
        localStorage.setItem("cityName", e.cityName);
        navigate("/city-hotels");
    }

    return (
        <Grid container direction="column" alignItems="center" className="city-grid" spacing={4}>
            {/* Title Section */}
            <Grid item xs={12} className="section-title-container">
                <Typography variant="h5" align="center" gutterBottom className="section-title">
                    Trending Destinations In India...
                </Typography>
            </Grid>
            
            {/* Cards Section */}
            <Grid container item xs={12} spacing={3} className="card-container1">
                {data.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={2} onClick={() => hotelsByCity(item)}>
                        <CityCards title={item.cityName} imgUrl={item.cityImage} disc={item.state} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default City;
