import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Container, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function AdminDashboard() {

const navigate = useNavigate();

  return (
    <>
    <Header></Header>
    
    <Container>
        <Typography variant="h3" gutterBottom >
          Admin Dashboard
        </Typography>
    <Grid>
    <Box sx={{ minWidth: 275 }}>
    <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        All Loan Applications
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        
      </Typography>
      <Typography variant="body" fontStyle={'italic'}>
        You can view all the apllications history here including Pending applications, 
        approved loan applications and those of rejected ones.
        <br />
      </Typography>
    </CardContent>
    <CardActions>
    <Button variant="contained" endIcon={<SendIcon />} onClick={() => {navigate("/admin-allApplication"); }}>
        See All Applications
    </Button>
    </CardActions>
  </React.Fragment>
    </Box>
   
<hr></hr>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
          <Card sx={{ maxWidth: 345 }} item xs={6}>
      <CardMedia
        component="img"
        alt="Image Alt Text"
        sx={{ height: 200 }}
        image="https://previews.123rf.com/images/rawpixel/rawpixel1607/rawpixel160739315/59901399-pending-application-form-document-reply-concept.jpg"
        title="New Loan Requests"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Pending Loan Applications..
        </Typography>
        <Typography variant="body2" color="text.secondary" fontStyle={'italic'}>
        These loan applications are "yet to be approved" or "under process," we are currently reviewing the application and conducting the necessary evaluations to determine whether to approve or decline the loan. 
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" endIcon={<SendIcon />} onClick={() => {navigate("/admin-pending"); }} >
        Pending Applications
      </Button>      
      </CardActions>
    </Card>
</CardContent>
    </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
          <Card sx={{ maxWidth: 345 }} item xs={6}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://cdn4.vectorstock.com/i/1000x1000/34/88/approved-loan-application-vector-20533488.jpg"
        title="Sanctioned Loans"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Approved Loan Applications
        </Typography>
        <Typography variant="body2" color="darkgreen" fontStyle={'italic'}>
        These are the "Approved" loan application refers to a financial application submitted by an individual or organization seeking a loan, and that application has been reviewed and accepted by the lending institution or lend
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" endIcon={<SendIcon />} onClick={() => {navigate("/admin-approved"); }}>
        Approved Applications
      </Button>
      </CardActions>
    </Card>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
          <Card sx={{ maxWidth: 345 }} item xs={6}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TW8yQ-HilBlUTlr9cVJdnRYIlJa-jaOMxBHGd4P4QoeQ179nr1_SSfCM4XdJmrkFkIE&usqp=CAU"
        title="Rejected Loans"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rejected Loan Applications..
        </Typography>
        <Typography variant="body2" color="red" fontStyle={'italic'} >
        These are "Rejected" loan application refers to a financial application submitted by an individual or organization seeking a loan, and that application has been reviewed and declined by the lending institution or lender. 
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" endIcon={<SendIcon />} onClick={() => {navigate("/admin-rejected"); }}>
        Rejected Applications
      </Button>      </CardActions>
    </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Grid>
    </Container>
 </>
  );
}