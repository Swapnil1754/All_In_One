import React, { useState } from "react";
import '../CSS/Register.css';
import { Container, Typography, TextField, Button, Grid, Checkbox } from '@mui/material';
import axios from 'axios';
import Toaster from "../../Common/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const initialData = {
    name1: "",
    password: "",
    mobNo: "",
    email: "",
    city: "",
    isOwner: false
  };
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({
    password: "",
    mobNo: "",
    email: ""
  })
  const url = process.env.REACT_APP_REGISTRATION_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myData = await callApi();
    console.log("Registration data:", myData.data);
  }
  const callApi = async () => {
    let data = [];
    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        data = response;
        const fullName = formData.name1;
        const firstName = fullName.split(' ')[0];
        setMessage(`Hello ${firstName} You Have Registered Successfully...!!!`);
        setTimeout(() => {
          navigate('/login')
        }, 8000)
      })
    } catch (error) {
      console.log("Error", error);
    }
    return data;
  }
  const handleChange = (e) => {
    const passwordRegex = /^[A-Za-z+_.-]+@[0-9]{1,}$/;
    const mobNoRegex = /[+](91)[0-9]{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const { name, value, type, checked } = e.target;
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "Please Enter a Valid Email Address...!!!" });
      } else {
        setErrors({ ...errors, email: '' });
      }
    } else if (name === 'passowrd') {
      if (!passwordRegex.test(value)) {
        setErrors({ ...errors, password: "Please Enter Password in proper format...!!!" });
      } else {
        setErrors({ ...errors, password: '' });
      }
    } else if (name === 'mobNo') {
      if (!mobNoRegex.test(value)) {
        setErrors({ ...errors, mobNo: "Invalid Mobile Number" });
      } else {
        setErrors({ ...errors, mobNo: '' })
      }
    }
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }
  return (
    <div className="a">
      <div className="b">
        <span style={{ 'color': 'white', 'fontSize': '35px', 'fontFamily': 'inherit' }}>All In One</span>
        <div className="f">
          <p style={{ 'color': 'white', 'fontFamily': 'cursive' }}>"All In One" is your one-stop destination for seamless travel and dining experiences. Whether you're planning a getaway, booking a bus journey, or looking for a delightful restaurant, we've got you covered. Our platform offers a range of services, from finding the perfect hotel to hopping on a bus for your next adventure and discovering the finest restaurants for a memorable dining experience. With "All In One," convenience and choice come together to make your journey extraordinary. Explore, book, and savor every moment with us. Your ultimate travel and dining companion is here.</p>
        </div>
      </div>
      <form className="c" onSubmit={handleSubmit}>

        <Grid container spacing={1}>
          <Typography variant="h6" align="center" gutterBottom>
            Create an Account
          </Typography>
          <Grid item xs={12}>
            <TextField
              label="Full Name" variant="outlined" fullWidth name="name1" value={formData.name1} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email" variant="outlined" fullWidth name="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password" variant="outlined" fullWidth name="password" type="password" value={formData.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number" variant="outlined" fullWidth name="mobNo" value={formData.mobNo} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City" variant="outlined" fullWidth name="city" value={formData.city} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              variant="outlined" fullWidth name="isOwner" checked={formData.isOwner} onChange={handleChange} />Do You wan't to Register as Owner?
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">Create Account</Button>
          </Grid>
        </Grid>
        <Grid>Already have an account? <a href="/login">Sign In</a></Grid>
        <Toaster message={message} />
      </form>
    </div>
  )
}
export default Register;