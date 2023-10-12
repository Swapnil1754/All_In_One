import React, { useState } from "react";
import '../CSS/Registration.css';
import { Container, Typography, TextField, Button, Grid, Checkbox } from '@mui/material';
import axios from 'axios';
const Register = () => {
    const initialData = {
        name1: "",
        password: "",
        mobNo: "",
        email: "",
        city: "",
        isOwner: false
    };
    const [formData, setFormData] = useState(initialData);
    const url = process.env.REACT_APP_REGISTRATION_URL;
    const handleSubmit = async(e) => {
        e.preventDefault();
        const myData = await callApi();
        console.log("Registration data:", myData);
    }
    const callApi = async() => {
        let data = [];
        try {
             await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            data = response;
        })
    } catch(error) {
        console.log("Error", error);
    }
    return data;
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked:value,
    });
    }
    return (
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name1"
              value={formData.name1}
              onChange={handleChange}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile No."
              variant="outlined"
              fullWidth
              name="mobNo"
              value={formData.mobNo}
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <Checkbox
              label="Is Owner"
              variant="outlined"
              name="isOwner"
              fullWidth
              checked={formData.isOwner}
              onChange={handleChange}
            /> Do You wan't to Register as Owner?
            </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    )
}
export default Register;