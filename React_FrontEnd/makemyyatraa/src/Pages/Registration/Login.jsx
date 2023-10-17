import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import '../CSS/Login.css';
import axios from "axios";
import Toaster from "../../Common/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const url = process.env.REACT_APP_LOGIN_URL;
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
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
        try{
        e.preventDefault();
        const login = await callApi(formData.userId);
        setToken(login.token);
        setMessage("Login Successful....!!!")
        navigate('/home')
        } catch(error) {
            console.log("error", error);
        }
    }
    return(
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Toaster message={message} />
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
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login with Facebook
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login with Google
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    )
}
export default Login;