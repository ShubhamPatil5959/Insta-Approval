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
  Typography,
  Button,
} from "@mui/material";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const AdminAllapplications = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/loan/viewallApplication"
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
    backgroundColor: "grey",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <Header></Header>
      <Container style={{ paddingTop: "16px" }}>
        <Typography variant="h4" gutterBottom>
          All Loan Applications
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
                <TableCell style={headerCellStyle}>Loan Status</TableCell>
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
                  <TableCell>{row.loanStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => {
            navigate("/admin-dashboard");
          }}
          color="inherit"
          variant="contained"
          style={{ marginTop: "17px" }}
        >
          Previous
        </Button>
      </Container>
    </>
  );
};

export default AdminAllapplications;
