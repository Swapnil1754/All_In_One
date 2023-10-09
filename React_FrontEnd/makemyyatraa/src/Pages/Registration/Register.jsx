import React, { useState } from "react";
import '../CSS/Registration.css';
import { Container, Typography, TextField, Button, Grid } from '@mui/material'
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here, e.g., send data to an API
        console.log("Registration data:", formData);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    )
}
export default Register;