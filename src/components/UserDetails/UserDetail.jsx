import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
const initialState = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  address: "",
  bankName: "",
  bankAccountNo: "",
  branchName: "",
  ifsc: "",
  adhaarNo: "",
};

function UserDetail() {
  // const aadhar = localStorage.getItem("aadhar");
  // if (aadhar) {
  //   const response = axios.get(
  //     `http://localhost:8090/user/getUserById/${aadhar}`
  //   );
  //   console.log(response);
  // }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    // Perform client-side validation checks here
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNo ||
      !formData.address ||
      !formData.bankName ||
      !formData.bankAccountNo ||
      !formData.branchName ||
      !formData.ifsc ||
      !formData.adhaarNo
    ) {
      setError("All fields are required");
      return false;
    }

    if (!/^[A-Za-z\s]{3,}$/.test(formData.firstName)) {
      setError("First name should not contain numeric or special characters");
      return false;
    }

    if (!/^[A-Za-z\s]{3,}$/.test(formData.lastName)) {
      setError("Last name should not contain numeric or special characters");
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobileNo)) {
      setError("Mobile number should be 10 digits");
      return false;
    }

    if (!/^\d{12}$/.test(formData.adhaarNo)) {
      setError("Aadhaar number should be 12 digits");
      return false;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
      setError("Invalid IFSC code");
      return false;
    }

    if (formData.branchName.length < 3) {
      setError("Branch name should be at least 3 characters");
      return false;
    }

    if (!/^[A-Za-z\s]{3,}$/.test(formData.bankName)) {
      setError("Bank name should not contain numeric or special characters");
      return false;
    }

    if (!/^[A-Za-z\s]{3,}$/.test(formData.branchName)) {
      setError("Branch name should not contain numeric or special characters");
      return false;
    }

    if (formData.bankName.length < 3) {
      setError("Bank name should be at least 3 characters");
      return false;
    }

    if (!/^\d{9,18}$/.test(formData.bankAccountNo)) {
      setError("Invalid bank account number");
      return false;
    }

    // You can add more specific validation checks for each field if needed

    return true; // Form is valid
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here

    if (!validateForm()) {
      return; // Don't submit if the form is not valid
    }

    const bankDetailsData = {
      accountNumber: formData.bankAccountNo,
      bankName: formData.bankName,
      ifscCode: formData.ifsc,
      branchName: formData.branchName,
    };

    const personalDetail = {
      aadharNo: formData.adhaarNo,
      email: localStorage.getItem("email"),
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile_No: formData.mobileNo,
      address: formData.address,
      bankDetails: bankDetailsData,
    };
    console.log(personalDetail);

    try {
      const response = await axios.post(
        "http://localhost:8090/user/AddUser",
        personalDetail
      );

      if (response.status === 200) {
        console.log("Data Saved successful!");
        console.log(response);
        localStorage.setItem("aadhar", personalDetail.aadharNo);
        navigate("/loan-form");
      } else {
        setError("Enter correct detail .");
      }
    } catch (error) {
      setError("Aadhar number Already present.");
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <Container maxWidth="md" style={{ marginTop: "17px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Personal Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Bank Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  variant="outlined"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  variant="outlined"
                  name="bankAccountNo"
                  value={formData.bankAccountNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  variant="outlined"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="IFSC Code"
                  variant="outlined"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adhaar Number"
                  variant="outlined"
                  name="adhaarNo"
                  value={formData.adhaarNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    navigate("/");
                  }}
                  color="primary"
                  variant="contained"
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginLeft: "1rem" }}
                >
                  NEXT
                </Button>

                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default UserDetail;
