import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../Common/Cards/Cards";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from "../../Common/Spinner/Spinner";
import '../CSS/Display-Hotel.css';
const DisplayHotel = () => {
    const [data, setData] = useState();
    const [laoding, setLoading] = useState(true);
    const url = process.env.REACT_APP_GET_HOTEL_URL;
    useEffect(() => {
        const callApi = async () => {
            try {
            AsyncStorage.getItem('regId').then(async (value) => {
                if(value) {
                    console.log("get value", value);
                    setTimeout( async() => {
                    const reaponse = await axios.get(url+`${value}`);
                    setData(reaponse.data);
                    setLoading(false)
                    }, 2000)
                } else{
                    console.log("error")
                    setLoading(false)
                }
            })
            } catch(error) {
                console.log("Error", error)
            }
        }
        callApi();
    }, [])
    return(
        <div>
            { laoding ? (<Spinner />):(
             <Cards title={data.hotelName}  imgUrl={data.image} city={data.city}/> 
            )
        }
        </div>
    )
}
export default DisplayHotel;