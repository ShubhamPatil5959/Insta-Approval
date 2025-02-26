import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f0f0f0", // Background color
  },
  card: {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    marginTop: "100px",
    marginLeft: "150px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  infoText: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  status: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  greenStatus: {
    color: "green",
  },
  orangeStatus: {
    color: "orange",
  },
  redStatus: {
    color: "red",
  },
  footer: {
    textAlign: "center",
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "#f0f0f0", // Set background color for the footer
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "skyblue",
    marginBottom: "225px",
  },
  heading: {
    textAlign: "center",

    background: "#f0f0f0", // Set background color for the footer
    paddingLeft: "300px",
    paddingRight: "300px",
    border: "solid black",
    color: "black",
    backgroundColor: "lightgreen",
    padding: "11px 300px",
  },
}));

function ViewLoanStatus() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [loanStatusColor, setLoanStatusColor] = useState("");
  const [rejectionReason1, setRejectionReason] = useState(""); // State to hold rejection reason
  const [approvalDate, setApprovalDate] = useState("");
  const [rejectionDate, setRejectionDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        // console.log("em", email);
        if (email) {
          const res = await axios.get(`http://localhost:8083/loan/${email}`);
          console.log(res);
          if (res.data[0]) {
            // const loanApplicationId = localStorage.getItem("loanApplicationId");
            const loanApplicationId = res.data[0].loanApplicationId;
            const response = await axios.get(
              `http://localhost:8083/loan/viewallApplication/${loanApplicationId}`
            );
            console.log(response.data);
            setData(response.data);
            const userFirstName = response.data.firstName;
            const status = response.data.loanStatus;

            // Determine the color based on the loan status
            if (status === "Pending") {
              setLoanStatusColor(classes.orangeStatus);
            } else if (status === "Approved") {
              setLoanStatusColor(classes.greenStatus);
              setApprovalDate(response.data.responseDate);
            } else if (status === "Rejected") {
              setLoanStatusColor(classes.redStatus);
              setRejectionReason(response.data.rejectionReason); // Set rejection reason
              setRejectionDate(response.data.responseDate);
            }
          } else {
            alert("Please first Apply for loan");
            navigate("/personal-detail");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const loggedName = localStorage.getItem("name");
  console.log(loggedName);

  return (
    <>
      <Header />
      <div>
        <h3 className={classes.heading}>
          Dear {data.name}, Welcome to car loan status dashboard
        </h3>

        <div className={classes.container}>
          <Grid item xs={12} sm={8} md={6}>
            <Paper className={classes.card}>
              {data && (
                <div>
                  <Typography className={classes.title}>
                    <h3 className={`${classes.status} ${loanStatusColor}`}>
                      Loan Status : {data.loanStatus}
                    </h3>
                  </Typography>

                  <Typography className={classes.infoText}>
                    <strong>Loan Application Id:</strong>
                    {data.loanApplicationId}
                  </Typography>

                  <Typography className={classes.infoText}>
                    <strong>Name:</strong> {data.name}
                  </Typography>

                  <Typography className={classes.infoText}>
                    <strong>Date of Application:</strong> {data.applicationDate}
                  </Typography>
                  {/* <Typography
                    className={`${classes.status} ${loanStatusColor}`}
                  >
                    <strong>Loan Status:</strong> {data.loanStatus}
                  </Typography> */}
                  {data.loanStatus === "Approved" && (
                    <Typography className={classes.infoText}>
                      <strong>Approval Date:</strong> {approvalDate}
                    </Typography>
                  )}
                  {data.loanStatus === "Rejected" && (
                    <Typography className={classes.infoText}>
                      <strong>Rejection Date:</strong> {rejectionDate}
                    </Typography>
                  )}
                  <Typography className={classes.infoText}>
                    <strong>Loan Amount:</strong> {data.loanAmount}
                  </Typography>
                  <Typography className={classes.infoText}>
                    <strong>Cibil Score:</strong> {data.cibilScore}
                  </Typography>

                  {rejectionReason1 && (
                    <Typography className={classes.infoText}>
                      <strong>Rejection Reason:</strong> {data.rejectionReason}
                    </Typography>
                  )}
                </div>
              )}
            </Paper>
            <p>
              <b>
                Note : Check your registered Email and Mobile Number for futher
                updates. Thank You for waiting..!
              </b>
            </p>
            <Button
              style={{ marginBottom: "2px" }}
              onClick={() => {
                navigate("/");
              }}
              color="primary"
              variant="contained"
            >
              Back to DashBoard
            </Button>
          </Grid>

          <div className={classes.footer}>
            <Typography className={classes.infoText}>
              For any queries, please contact us at:
            </Typography>
            <Typography className={classes.infoText}>
              Email: CarLoanSupport@gmail.com
            </Typography>
            <Typography className={classes.infoText}>
              Phone: +1 (123) 4286223344
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewLoanStatus;
