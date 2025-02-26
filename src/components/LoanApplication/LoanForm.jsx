import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Label } from "@mui/icons-material";
import Header from "../Header/Header";

const initialState = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  email: "",
  address: "",
  adhaarNo: "",
  occupation: "",
  monthlyincome: "",
  totalLoanRequired: "",
  bankName: "",
  bankAccountNo: "",
  bankDetails: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  },

  ifsc: "",
  loanRequestAmount: "",
};

function LoanForm() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    (async () => {
      // Fetch user data from the endpoint using Aadhaar number (replace with actual Aadhaar number)
      const aadhaarNumber = localStorage.getItem("aadhar"); // Replace with the user's Aadhaar number or retrieve it from your application state
      const res = await axios.get(
        `http://localhost:8090/user/getUserById/${aadhaarNumber}`
      );

      const userData = res.data; // Assuming the response contains user data
      setFormData({
        ...initialState, // Reset the form fields to their initial state
        ...userData, // Populate the form fields with user data
      });
      console.log("all data", formData);

      setLoading(false);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function generateCibilScore(monthlyIncome, loanAmount) {
    // Define some arbitrary thresholds and weights
    const incomeThreshold = 50000; // Example: Monthly income of 50,000 or more
    const loanThreshold = 500000; // Example: Loan amount of 500,000 or more
    const maxScore = 900; // Maximum CIBIL score
    const minScore = 300; // Minimum CIBIL score

    // Start with a base score
    let cibilScore = 500;

    // Adjust the score based on income
    if (monthlyIncome >= incomeThreshold) {
      cibilScore += 100;
    }

    // Adjust the score based on loan amount
    if (loanAmount <= loanThreshold) {
      cibilScore += 100;
    }

    // Ensure the score is within the min-max range
    if (cibilScore > maxScore) {
      cibilScore = maxScore;
    }
    if (cibilScore < minScore) {
      cibilScore = minScore;
    }

    return cibilScore;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const min = 10000;
    const max = 100000;
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

    // Reset any previous validation errors
    setError(null);

    // Validation checks//me
    if (formData.occupation.trim() === "") {
      setError("* Required Field cannot be empty");
      return;
    }

    if (isNaN(formData.monthlyincome) || formData.monthlyincome.trim() === "") {
      setError("* Required Field cannot be empty");
      return;
    }
    if (formData.monthlyincome <= 0) {
      setError("* Monthly Income must be a positive number.");
      return;
    }

    if (
      isNaN(formData.totalLoanRequired) ||
      formData.totalLoanRequired.trim() === ""
    ) {
      setError("* Required Field cannot be empty");
      return;
    }
    if (formData.monthlyincome <= 0) {
      setError("* Loan required field must be a positive number.");
      return;
    }

    if (!selectedFile) {
      setError("Proof of Income document must be uploaded.");
      return;
    }

    // upload document

    // Example usage:
    const loanApplicationData = {
      loanApplicationId: randomValue,
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      accountNumber: formData.bankDetails.accountNumber,
      applicationDate: new Date().toLocaleDateString(),
      monthlyIncome: parseInt(formData.monthlyincome, 10),
      loanAmount: parseInt(formData.totalLoanRequired, 10),
      // file: selectedFile,
      cibilScore: generateCibilScore(
        formData.monthlyincome,
        formData.totalLoanRequired
      ),
      loanStatus: "Pending",
      occupation: formData.occupation,
    };

    const formData1 = new FormData();
    formData1.append("image", selectedFile);

    // if (selectedFile) {
    //   loanApplicationData.append("documentUploaded", selectedFile);
    // }

    // Add form submission logic here
    //http://localhost:8083/loan/addDetail
    console.log(loanApplicationData);
    localStorage.setItem(
      "loanApplicationId",
      loanApplicationData.loanApplicationId
    );

    localStorage.setItem("name", formData.firstName);

    try {
      // Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(
        "http://localhost:8083/loan/up", // Replace with your Cloudinary upload API endpoint
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (cloudinaryResponse.status === 200) {
        console.log("Image uploaded successfully");
        console.log(cloudinaryResponse);
        localStorage.setItem("url", cloudinaryResponse.data.url);
      } else {
        setError("Image Uploading error .");
      }
    } catch (error) {
      setError("Error while  uploading document image.");
      console.error("An error occurred:", error);
    }

    loanApplicationData.document_url = localStorage.getItem("url");
    try {
      const response = await axios.post(
        "http://localhost:8083/loan/addDetail",
        loanApplicationData
      );

      if (response.status === 201) {
        console.log("Data Saved successful!");
        console.log(response);
        navigate("/thank-you");
      } else {
        setError("Enter correct detail .");
      }
    } catch (error) {
      setError("Please Enter correct details.");
      console.error("An error occurred:", error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Add Reset logic here
    setFormData(initialState);
    console.log(formData);
  };

  return (
    <>
      <Header></Header>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Application for Loan
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
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Permanent Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Monthly Income "
                  variant="outlined"
                  name="monthlyincome"
                  value={formData.monthlyincome}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Loan Required"
                  variant="outlined"
                  name="totalLoanRequired"
                  value={formData.totalLoanRequired}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Proof Of Income</Typography>
                {/* <span></span> */}
                <TextField
                  type="file"
                  accept="image/*" // Optionally, restrict accepted file types
                  onChange={handleFileChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  variant="outlined"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  name="mobileNo"
                  value={formData.mobile_No}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Adhaar UID Number"
                  variant="outlined"
                  name="adhaarNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  variant="outlined"
                  name="bankName"
                  value={formData.bankDetails.bankName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  variant="outlined"
                  name="bankAccountNo"
                  value={formData.bankDetails.accountNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bank IFSC Code"
                  variant="outlined"
                  name="ifsc"
                  value={formData.bankDetails.ifscCode}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <Button variant="contained" color="primary" type="submit">
                  Apply
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  color="primary"
                  variant="contained"
                >
                  Previous
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Typography color="error" gutterBottom>
                  {error}
                </Typography>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoanForm;
