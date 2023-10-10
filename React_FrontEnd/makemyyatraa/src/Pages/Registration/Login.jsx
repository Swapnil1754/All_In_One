import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import '../CSS/Login.css';
import axios from "axios";
const Login = () => {
    const url = process.env.REACT_APP_LOGIN_URL;
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    });
    const params = {
        password: formData.password
    }
    const callApi = async (userId) => {
        try {
          const response = await axios.post(url+`${userId}?password=${formData.password}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            return response.data;
        } catch(error) {
            console.log("Error", error);
        }
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = await callApi(formData.userId);
        setToken(login.token);
    }
    return(
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="UserId"
              variant="outlined"
              fullWidth
              name="userId"
              value={formData.userId}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    )
}
export default Login;