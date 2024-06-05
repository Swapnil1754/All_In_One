import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [verify, setVerify] = useState('');
  const [allow, setAllow] = useState(false);
  const [getOtp, setGetOtp] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const otpUrl = process.env.REACT_APP_GET_OTP_URL;
  const otpBySmsUrl = process.env.REACT_APP_GET_OTP_BY_SMS_URL;
  const forgetPasswordUrl = process.env.REACT_APP_FORGET_PASSWORD_URL;

  const fadeIn = useSpring({
    opacity: getOtp ? 1 : 0,
    marginTop: getOtp ? 0 : -20,
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const submitEmail = async () => {
    try {
      const response = await axios.get(otpUrl + email);
      setVerify(response.data);
      setGetOtp(true);
      console.log('otp: ', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const submitSms = async () => {
    try {
      const response = await axios.get(otpBySmsUrl + email);
      setVerify(response.data);
      setGetOtp(true);
      console.log('otp: ', response.data);
      return response.data;
    } catch(err) {
      console.log(err)
    }
  }

  const handleOtp = (e) => {
    setUserOtp(e.target.value);
  }

  const verifyOtp = () => {
    if (verify === userOtp) {
      setAllow(true);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const savePassword = async () => {
    const response = await axios.put(`${forgetPasswordUrl}${email}?password=${password}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log("password", response.data);
    navigate('/login')
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Forget Password
        </Typography>
        <animated.div style={fadeIn}>
          {getOtp && (
            <>
              <TextField label="Enter OTP Received on Email" fullWidth onChange={handleOtp} margin="normal" />
              <Button variant="contained" color="primary" fullWidth onClick={verifyOtp}>
                Verify OTP
              </Button>
            </>
          )}
        </animated.div>
        {allow && (
          <div>
            <TextField label="Enter New Password" fullWidth type="password" onChange={handlePassword} margin="normal" />
            <Button variant="contained" color="primary" fullWidth onClick={savePassword}>
              Submit Password
            </Button>
          </div>
        )}
        {!getOtp && (
          <>
            <TextField label="Enter Registered Email Id or Mobile Number" fullWidth value={email} onChange={handleChange} margin="normal" />
            <Button variant="contained" color="primary" fullWidth onClick={submitEmail}>
              Get OTP By Mail
            </Button><br />
            <Button variant="contained" color="primary" fullWidth onClick={submitSms}>
              Get OTP By SMS
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}

export default ForgetPassword;
