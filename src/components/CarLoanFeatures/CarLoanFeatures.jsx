import React from "react";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import "./CarLoanFeatures.css"; // Import the external CSS file

const CarLoanFeatures = () => {
  return (
    <div className="car-loan-features">
      <h1 className="heading">Car Loan Features</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              height="230"
              className="card-image"
              image="https://www.mahindrafinance.com/wp-content/uploads/2023/06/Wide-Variety-of-Vehicles-icons.svg" // Replace with the actual image path
              alt="Wide Variety of Vehicles"
            />
            <CardContent className="card-content">
              <Typography variant="h6">Wide Variety of Vehicles</Typography>
              <Typography variant="body2">
                We finance most passenger and multi-utility vehicles available
                in the market.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              height="230"
              image="https://www.mahindrafinance.com/wp-content/uploads/2023/06/Attractive-Interest-Rates-icon.svg" // Replace with the actual image path
              alt="Attractive Interest Rates"
            />
            <CardContent className="card-content">
              <Typography variant="h6">Attractive Interest Rates</Typography>
              <Typography variant="body2">
                Our reasonable and affordable interest rates come with up to
                100% ex-showroom funding.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              height="230"
              image="https://www.mahindrafinance.com/wp-content/uploads/2023/06/Multiple-Repayment-Options-icon.svg" // Replace with the actual image path
              alt="Attractive Interest Rates"
            />
            <CardContent className="card-content">
              <Typography variant="h6">Multiple Repayment Options</Typography>
              <Typography variant="body2">
                Our car loan financing is based on a flat rate model and you can
                choose to pay via Cash or Online.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              height="230"
              image="https://www.mahindrafinance.com/wp-content/uploads/2023/06/Minimal-Documentation-icon.svg" // Replace with the actual image path
              alt="Attractive Interest Rates"
            />
            <CardContent className="card-content">
              <Typography variant="h6">Minimal Documentation</Typography>
              <Typography variant="body2">
                We cater to all types of customers, salaried and self-employed,
                including farmers and traders, with or without income proof.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardMedia
              component="img"
              height="230"
              image="https://www.mahindrafinance.com/wp-content/uploads/2023/06/Quick-Disbursal-icon.svg" // Replace with the actual image path
              alt="Attractive Interest Rates"
            />
            <CardContent className="card-content">
              <Typography variant="h6">Quick Disbursal</Typography>
              <Typography variant="body2">
                Our simple and quick process can have your car loan sanctioned
                as soon as your application is approved, subject to document
                verification.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarLoanFeatures;
