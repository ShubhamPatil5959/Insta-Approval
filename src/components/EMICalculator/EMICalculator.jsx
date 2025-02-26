import React, { useState, useEffect } from "react";
import {
  Slider,
  Button,
  Typography,
  Grid,
  Container,
  Card,
} from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import "./EMICalculator.css";
import CarLoan from "../CarLoan/CarLoan";
import CarLoanFeatures from "../CarLoanFeatures/CarLoanFeatures";
import Faq from "../AskedQuestions/Faq";
import Header from "../Header/Header";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000); // Default loan amount (e.g., 100,000)
  const [interestRate, setInterestRate] = useState(5); // Default interest rate (e.g., 5%)
  const [tenureMonths, setTenureMonths] = useState(12); // Default tenure (e.g., 12 months)
  const [totalAmountPayable, setTotalAmountPayable] = useState(0);
  useEffect(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(tenureMonths);

    const emi =
      (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalPayment = emi * n;
    setTotalAmountPayable(totalPayment.toFixed(2));
  }, [loanAmount, interestRate, tenureMonths]);

  const handleReset = () => {
    setLoanAmount(100000); // Reset to default loan amount
    setInterestRate(5); // Reset to default interest rate
    setTenureMonths(12); // Reset to default tenure
  };

  return (
 <>
    <Header></Header>
    <Container className="emi-container">
      <CarLoan />

      <Card className="emi-card" elevation={3}>
        <Typography variant="h4" className="heading" gutterBottom>
          <h3> EMI Calculator</h3>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Loan Amount (INR): {loanAmount}
            </Typography>
            <Slider
              value={loanAmount}
              onChange={(e, value) => setLoanAmount(value)}
              min={0}
              max={1000000}
              step={10000}
              />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Interest Rate (%): {interestRate}
            </Typography>
            <Slider
              value={interestRate}
              onChange={(e, value) => setInterestRate(value)}
              min={0}
              max={20}
              step={0.1}
              />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Tenure (Months): {tenureMonths}
            </Typography>
            <Slider
              value={tenureMonths}
              onChange={(e, value) => setTenureMonths(value)}
              min={0}
              max={360}
              step={1}
              />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total Amount Payable: ₹{totalAmountPayable}
            </Typography>
            <div className="emi-pie-chart-container">
              <PieChart
                data={[
                  {
                    title: "Principal Amount",
                    value: parseFloat(loanAmount),
                    color: "#E38627",
                  },
                  {
                    title: "Interest",
                    value: totalAmountPayable - parseFloat(loanAmount),
                    color: "#C13C37",
                  },
                ]}
                />
              <div className="emi-pie-chart-labels">
                <Typography variant="subtitle1">
                  Principal: ₹{parseFloat(loanAmount).toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Interest: ₹
                  {(totalAmountPayable - parseFloat(loanAmount)).toFixed(2)}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
      <CarLoanFeatures />
      <Faq />
    </Container>
                </>
  );
};

export default EMICalculator;
