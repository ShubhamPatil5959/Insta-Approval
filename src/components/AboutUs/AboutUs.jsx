import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  styled,
  Paper,
  CssBaseline,
} from "@mui/material";
import Header from "../Header/Header";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: "600px",
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: "15px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const useStyles = {
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  email: {
    fontSize: "1rem",
    color: "#007BFF",
  },
};

const AboutUs = () => {
  return (
    <>
   <Header></Header>
    <div style={{ background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)" }}>
      <div
        style={{
          background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
        <CssBaseline />
        <Container>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            >
            {/* <Grid item xs={12}> */}
            {/* <Typography
              variant="h2"
              component="div"
              textAlign="center"
              gutterBottom
              >
              About Us
            </Typography> */}
            {/* </Grid> */}
            <Grid item xs={12} sm={6}>
              <StyledCard elevation={5}>
                <CardContent>
                  <Typography sx={useStyles.title} gutterBottom>
                    Welcome to our Car Loan Application!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We are a dedicated team of developers committed to making
                    car loans accessible to everyone. Our mission is to provide
                    a hassle-free loan approval process based on your
                    occupation, bank details, and CIBIL score.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    With our user-friendly and secure application process, you
                    can borrow up to 5 lakhs for your car financing needs. We
                    prioritize transparency, security, and customer
                    satisfaction.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    {/* Sample Logo */}
                    <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
                      <img
                        src="https://img.freepik.com/free-vector/car-finance-concept-illustration_114360-8058.jpg?size=626&ext=jpg"
                        alt="Company Logo"
                        width="150"
                        />
                    </Paper>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard elevation={5}>
                <CardContent>
                  <Typography sx={useStyles.title} gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography sx={useStyles.paragraph} paragraph>
                    Developers of the Project:
                  </Typography>
                  <Typography sx={useStyles.paragraph} paragraph>
                    {" "}
                    <span className={useStyles.email}>
                      Amanjot Singh - amanjot.singh@fyndna.com
                    </span>
                  </Typography>
                  <Typography sx={useStyles.paragraph} paragraph>
                    {" "}
                    <span className={useStyles.email}>
                      Mahesh Thorat - mahesh.thorat@fyndna.com
                    </span>
                  </Typography>
                  <Typography sx={useStyles.paragraph} paragraph>
                    {" "}
                    <span
                      className={useStyles.email}
                      style={{ fontSize: "1.2rem", marginLeft: "30px" }}
                      >
                      Ketan Jayde - ketan.jayde@fyndna.com
                    </span>
                  </Typography>
                  <Typography sx={useStyles.paragraph} paragraph>
                    {" "}
                    <span className={useStyles.email}>
                      Shubham Patil - shubham.patil@fyndna.com
                    </span>
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
                      </>
  );
};

export default AboutUs;
