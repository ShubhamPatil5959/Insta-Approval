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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import "./AdminPending.css";
import ReactImageZoom from "react-image-zoom";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminPending = () => {
  const [data, setData] = useState([]);
  const [rejectedReasons, setRejectedReasons] = useState({});
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [change, setChange] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/loan/getPendingApplication"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [change]);

  const handleApprove = async (loanApplicationId) => {
    // http://localhost:8083/loan/approvedLoan/54574

    const loanStatusData = {
      loanStatus: "Approved",
    };

    try {
      const response = await axios.put(
        `http://localhost:8083/loan/approvedLoan/${loanApplicationId}`,
        loanStatusData
      );
      const d = Math.random();
      await setChange(d);
      console.log(response);
      alert("Loan is Approved");
    } catch (e) {
      console.log("Error while updating loan status", e);
    }
  };

  const handleReject = async (loanApplicationId) => {
    localStorage.setItem("loanApplicationId", loanApplicationId);
    setSelectedApplicationId(loanApplicationId);
    setOpenRejectDialog(true);
    const loanStatusData = {
      loanStatus: "Rejected",
    };

    try {
      const response = await axios.put(
        `http://localhost:8083/loan/approvedLoan/${loanApplicationId}`,
        loanStatusData
      );

      console.log(response);
    } catch (e) {
      console.log("Error while updating loan status", e);
    }
  };

  const handleReasonChange = (reason) => {
    setRejectedReasons({ ...rejectedReasons, [selectedApplicationId]: reason });
  };

  const handleViewDocument = (documentUrl) => {
    setDocumentUrl(documentUrl);
    setOpenDocumentDialog(true);
  };

  const handleCloseDocumentDialog = () => {
    setOpenDocumentDialog(false);
  };

  const handleViewReasonDialog = (loanApplicationId) => {
    setSelectedApplicationId(loanApplicationId);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setSelectedApplicationId(null);
    setOpenRejectDialog(false);
  };

  const handleConfirmReject = async () => {
    setSelectedApplicationId(null);
    setOpenRejectDialog(false);

    const loanApplicationId = localStorage.getItem("loanApplicationId");
    const rejectionData = {
      rejectionReason: rejectedReasons[loanApplicationId],
    };

    try {
      const response = await axios.put(
        `http://localhost:8083/loan/rejectedLoan/${loanApplicationId}`,
        rejectionData
      );
      console.log(response);
      const d = Math.random();
      await setChange(d);
    } catch (e) {
      console.log("Error while updating rejection Reason", e);
    }
  };

  return (
    <>
      <Header></Header>
      <Container style={{ paddingTop: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Pending Loan Applications
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Cibil Score</TableCell>
                <TableCell>Monthly Income</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Loan Amount</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Actions</TableCell>
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
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDocument(row.document_url)}
                      >
                        View Document
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(row.loanApplicationId)}
                      >
                        Approve
                      </Button>
                      <Button
                        style={{ marginLeft: 3 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleReject(row.loanApplicationId);
                          handleViewReasonDialog(row.loanApplicationId);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
          <DialogTitle>Reason for Rejection</DialogTitle>
          <DialogContent>
            <TextField
              label="Reason"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={rejectedReasons[selectedApplicationId] || ""}
              onChange={(e) => handleReasonChange(e.target.value)}
              style={{ width: "500px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRejectDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmReject} color="secondary">
              Confirm Reject
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDocumentDialog} onClose={handleCloseDocumentDialog}>
          <DialogTitle>View Document</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img
                src={documentUrl}
                alt="Document"
                style={{ maxWidth: "100%" }}
              />
              {/* <ReactImageZoom
              img={documentUrl}
              width={800} // Adjust the width as needed
              max-height={1000} // Adjust the height as needed
              zoomPosition="original"
            /> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDocumentDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

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

export default AdminPending;
