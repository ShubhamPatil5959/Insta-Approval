import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useNavigate } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Header from "../Header/Header";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ChangePassword() {
  const [old_password, setOld_password] = useState("");
  const [new_password1, setnewPassword] = useState("");
  const [con_new_password, setConPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!old_password || !new_password1 || !con_new_password) {
      setError("All fields are required");
      return;
    }

    const password = {
      password: new_password1,
    };
    setError("");
    try {
      const aadhaarNumber = localStorage.getItem("aadhar");
      const email = localStorage.getItem("email");
      const response = await axios.put(
        `http://localhost:8085/auth/changePassword/${email}`,
        password
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Password Changed successful!");
      } else {
        setError("failed");
      }
    } catch (error) {
      setError("Please Enter correct details.");
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
    <Header></Header>
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Old_password"
              label="Old_password"
              name="Old_password"
              autoComplete="Old_password"
              autoFocus
              onChange={(e) => {
                setOld_password(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="new_password"
              label="new_Password"
              type="new_password"
              id="new_password"
              autoComplete="new-password"
              onChange={(e) => {
                setnewPassword(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_new_password"
              label="confirm_new_password"
              type="confirm_new_password"
              id="confirm_new_password"
              autoComplete="confirm_new-password"
              onChange={(e) => {
                setConPassword(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
