import React, { createContext, useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid, Checkbox } from '@mui/material';
import '../CSS/Login.css';
import axios from "axios";
import Toaster from "../../Common/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactComponent as GoogleIcon } from '../../Common/Assets/google.svg';
import { ReactComponent as FacebookIcon } from '../../Common/Assets/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../Common/Assets/instagram.svg';
import { ReactComponent as SmileyIcon } from '../../Common/Assets/smiley.svg';
 const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const url = process.env.REACT_APP_LOGIN_URL;
    const googleUrl = process.env.REACT_APP_GOOGLE_URL;
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        password: "",
        rememberMe: false
    });
    const params = {
        password: formData.password
    }
    useEffect(() => {
      const fun = async () => {
      if (window.location.hash) {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
        const idToken = urlParams.get('id_token');
        AsyncStorage.clear();
        await AsyncStorage.setItem('Token', accessToken).then(() => console.log("Google Token Saved Successfully...")).catch(() => console.log("error While Saving Google Token..."))
        const googleLogin = await googleApi(idToken)
        const fullName = await googleLogin.data.name1;
        const firstName = fullName.split(' ')[0];
        setStatus(true)
        setMessage(
          <div>
            <span>Welcome Back {firstName}...!!! Have a Nice Day  <SmileyIcon className="smiley" /></span>
          </div>
        );
        setTimeout(() => {
          navigate('/home')
        }, 8000);
        window.location.hash = '';
      }
    }
    fun();
    }, []);
    
    const googleApi = async (gToken) => {
      try {
        const response = await axios.get(googleUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          params: {
            token: gToken
          }
        })
        return response;
      } catch(error) {
        console.log("Error", error);
      }
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
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked:value,
        });
    }
    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        const login = await callApi(formData.userId);
        setToken(login.token);
        await AsyncStorage.setItem('Token', login.token).then(() => console.log('Token Saved Successfully...!!!')).catch(() => console.log("Error While Saving Token..."))
        const fullName = await login.Name;
        const firstName = fullName.split(' ')[0];
        setStatus(true)
        setMessage(
          <div>
            <span>Welcome Back {firstName}...!!! Have a Nice Day  <SmileyIcon className="smiley" /></span>
          </div>
        );
        setTimeout(() => {
          navigate('/home')
        }, 6000);
        } catch(error) {
            console.log("error", error);
        }
    }
    const responseGoogle = async () => {
      const clientId = '578349732074-ddo6roou2d4o05trh2ajmevnngudc39n.apps.googleusercontent.com';
      const redirectUri = 'http://localhost:3000/login';
      const scope = 'openid profile email';
      const responseType = 'id_token token';
      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
      window.location.href = authUrl;
    }
    return(
    <div className="x">
      <div className="y">
        <Typography variant="h3" align="center" gutterBottom>Welcome...!!!</Typography>
      </div>
      <Grid className="z">
      <Typography variant="h5" align="center" gutterBottom>LOGIN</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField label="UserId" variant="outlined" fullWidth name="userId" value={formData.userId} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
          <TextField label="Password" variant="outlined" type="password" fullWidth name="password" value={formData.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
          <Checkbox 
           variant="outlined" fullWidth name="rememberMe" checked={formData.rememberMe} onChange={handleChange}/>Remember Me
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained">LOGIN</Button>
          </Grid>
          <a href="" style={{'marginLeft':'35%', 'marginTop':'5%'}}>Forget Password ?</a>
          <Grid className="v">
            <Grid><hr className="t" /><span> OR </span><hr className="t" /></Grid>
            <div className="icon">
              <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="social-icon" />    </a>
              </div>
              
              <div style={{'margin-left':'30px', 'marginRight':'30px'}}>
            <a href="javascript:void(0)" onClick={responseGoogle} target="_blank" rel="noopener noreferrer">
            <GoogleIcon className="social-icon" />
            </a>
              </div>
              <div>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="social-icon" /></a>
              </div>
              </div>
           <Grid><span>Don't Have Account ? <a href="/register">Sign Up</a></span></Grid>
          </Grid>
          <Toaster message={message} />
          {/* {flag ? (<Header status={status} />):(<></>)} */}
        </Grid>
      </form>
      </Grid>
    </div>
    )
}
export default Login;