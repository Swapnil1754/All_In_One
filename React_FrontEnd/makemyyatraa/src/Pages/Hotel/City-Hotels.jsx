import React, { useEffect, useState } from "react";
import '../CSS/City-Hotels.css';
import { Typography, Grid } from '@mui/material';
import Cards from "../../Common/Cards/Cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CityHotels = () => {
    const [hotelData, setHotelData] = useState([]);
    const [cityData, setCitydata] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const url = process.env.REACT_APP_GET_HOTEL_BY_CITY_URL;
        const callApi = async () => {
            try {
                const value = localStorage.getItem("cityName");
                if (value) {
                    const response = await axios.get(url + `${value}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    console.log('response', response.data);
                    setHotelData(response.data);
                    setCitydata(value);
                } else {
                    console.log("Value is not available");
                }
            } catch (error) {
                console.log("Error", error);
            }
        };        
        callApi();
    }, []);
    const trial = (e) => {
        localStorage.setItem('regId', e.registrationId);
        navigate('/display-hotel')
    }
    return(
        <Grid className="city-hotels-grid">
         {/* <div> */}
  <Typography variant="h5" className="city-hotels-title" align="center" gutterBottom>
    Showing Results for {cityData}
  </Typography>
  <div className="card-container">
    {hotelData.map((item, index) => (
      <div key={index} onClick={() => trial(item)} className="city-hotels-card">
        <Cards 
          title={item.hotelName} 
          imgUrl={item.image} 
          ratings={item.rating} 
          disc={item.city} 
        />
      </div>
    ))}
  </div>
  {/* </div> */}
 </Grid>

    )
}
export default CityHotels;