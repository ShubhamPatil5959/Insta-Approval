import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminRejected = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/loan/getRejectedApplication"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const headerCellStyle = {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <>
      <Header />
      <Container style={{ paddingTop: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Loan Rejected Applications
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerCellStyle}>ID</TableCell>
                <TableCell style={headerCellStyle}>Name</TableCell>
                <TableCell style={headerCellStyle}>Account Number</TableCell>
                <TableCell style={headerCellStyle}>Application Date</TableCell>
                <TableCell style={headerCellStyle}>Cibil Score</TableCell>
                <TableCell style={headerCellStyle}>Monthly Income</TableCell>
                <TableCell style={headerCellStyle}>Occupation</TableCell>
                <TableCell style={headerCellStyle}>Loan Amount</TableCell>
                <TableCell style={headerCellStyle}>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.accountNumber}>
                  <TableCell>{row.loanApplicationId}</TableCell>

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.accountNumber}</TableCell>
                  <TableCell>{row.applicationDate}</TableCell>
                  <TableCell>{row.cibilScore}</TableCell>
                  <TableCell>{row.monthlyIncome}</TableCell>
                  <TableCell>{row.occupation}</TableCell>
                  <TableCell>{row.loanAmount}</TableCell>
                  <TableCell>{row.rejectionReason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => {
            navigate("/admin-dashboard");
          }}
          color="primary"
          variant="contained"
          style={{ marginTop: "7px" }}
        >
          <ArrowBackIcon />
          Previous
        </Button>
      </Container>
    </>
  );
};

export default AdminRejected;
