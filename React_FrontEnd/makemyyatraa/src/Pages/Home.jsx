import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Common/Cards/Cards";
import { useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import './CSS/Home.css';
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const formData = {
        title: data.hotelName,
    }
    useEffect(() => {
    const url = process.env.REACT_APP_GET_ALL_HOTELS_URL;
    const callApi = async () => {
        setLoading(true);
        try {
        const response = await axios.get(url);
        setData(response.data);
        return response;
        } catch(error) {
            console.log("Error", error)
            setLoading(false)
        }
        setLoading(false)
    }
    callApi();
},[])
const trial = (e) => {
    AsyncStorage.setItem('regId', e.registrationId)
    .then(() => { console.log("Data Saved Successfull...!!!")})
    .catch((error) => {console.log("Data Saving Failed...!!!")});
    navigate('/display-hotel')
}
    return(
        <div className="card-container">
            {data.map((item, index) => (
           <div key={index} onClick={(e) => trial(item)}>
            <Cards title={item.hotelName} imgUrl={item.image} ratings={item.rating} disc={item.city} />
           </div>))
}

        </div>
    )
}
export default Home;