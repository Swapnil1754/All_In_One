import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import '../CSS/Login.css';
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {

    }
    const handleSubmit = (e) => {

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
              label="Email or UserName"
              variant="outlined"
              fullwidth
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
              fullwidth
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
              fullwidth
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