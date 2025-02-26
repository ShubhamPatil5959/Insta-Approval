import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function ViewCustomerDetails() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const aadhar = localStorage.getItem("aadhar");
    axios
      .get(`http://localhost:8090/user/getUserById/${aadhar}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Send a PUT request to update user profile on the server
    axios
      .put(
        `http://localhost:8090/user/updateUser/${userData.aadharNo}`,
        userData
      )
      .then((response) => {
        console.log("User profile updated:", response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Your Profile:
          </Typography>
          {!isEditing ? (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
          <br></br>
          <br></br>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    fullWidth
                    value={userData.firstName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={userData.lastName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Aadhar UID"
                    variant="outlined"
                    fullWidth
                    value={userData.aadharNo}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, aadharNo: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    value={userData.mobile_No}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, mobile_No: e.target.value })
                    }
                  />
                </Grid>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Permanent Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  value={userData.address}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bank Name"
                    variant="outlined"
                    fullWidth
                    value={userData.bankDetails.bankName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, bankName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Holder"
                    variant="outlined"
                    fullWidth
                    value={userData.firstName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Number"
                    variant="outlined"
                    fullWidth
                    value={userData.bankDetails.accountNumber}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="IFSC Code"
                    variant="outlined"
                    fullWidth
                    value={userData.bankDetails.ifscCode}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, ifscCode: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={userData.bankDetails.branchName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, branchName: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default ViewCustomerDetails;
