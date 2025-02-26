import React from "react";
import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CarLoan.css";

export default function CarLoan() {
  const navigate = useNavigate();
  const user= localStorage.getItem("email");
  return (
    <Card className="car-loan-card" elevation={3}>
      <CardContent className="car-loan-content">
        <div className="car-logo">
          {/* Replace with your car SVG logo */}
          <img
            src="https://www.mahindrafinance.com/wp-content/uploads/2023/06/products-loans-banner.png"
            alt="Car Logo"
          />
        </div>
        <div className="car-text">
          <h1>Get Behind the Wheel of Your Dreams</h1>
          <h2>with our affordable Car Loans</h2>
        </div>
       { user!=null && <Button
          onClick={() => {
            navigate("/personal-detail");
          }}
          variant="contained"
          color="primary"
          className="apply-button"
        >
          APPLY NOW
        </Button>}
      </CardContent>
    </Card>
  );
}
