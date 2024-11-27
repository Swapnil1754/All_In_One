import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Common/Cards/Cards";
import { useNavigate } from "react-router-dom";
import './CSS/Home.css';
import { Paper, Tabs, Tab } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(0);
    const formData = {
        title: data.hotelName,
    }

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    useEffect(() => {
        const url = process.env.REACT_APP_GET_ALL_HOTELS_URL;
        const callApi = async () => {
            console.log(url);
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
                return response;
            } catch (error) {
                console.log("Error", error)
            }
            setLoading(false);
        }
        callApi();
    }, [])

    const trial = (e) => {
        localStorage.setItem('regId', e.registrationId);
        navigate('/display-hotel')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className="home-container">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Hotel Booking" />
                <Tab label="Restaurants" />
                <Tab label="Bus Booking" />
                <Tab label="Train Booking" />
                <Tab label="Flight Booking" />
            </Tabs>
            <animated.div style={fadeIn}>
                <div>
                    {value === 0 &&
                        <div className="card-container">
                            {data.map((item, index) => (
                                <div key={index} onClick={() => trial(item)}>
                                    <Cards title={item.hotelName} imgUrl={item.image} ratings={item.rating} disc={item.city} />
                                </div>
                            ))}
                        </div>
                    }
                    {value === 1 &&
                        <div>
                            <h1>Content 2</h1>
                        </div>
                    }
                    {value === 2 && 
                    <div>
                        
                    </div>
                    }
                </div>
            </animated.div>
        </Paper>
    )
}

export default Home;
