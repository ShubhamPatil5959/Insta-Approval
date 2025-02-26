import React from "react";
import "./ThankYouMessage.css"; // Import your CSS file
import Header from "../Header/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function ThankYouMessage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="thank-you-container">
        <div className="thank-you-message">
          <h1>Thank You!</h1>
          <p>Your loan application has been received.</p>
          <Button
            onClick={() => {
              navigate("/");
            }}
            color="primary"
            variant="contained"
          >
            Back To DashBoard
          </Button>
        </div>
      </div>
    </>
  );
}

export default ThankYouMessage;
