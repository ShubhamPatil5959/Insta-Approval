import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import EMICalculator from "./components/EMICalculator/EMICalculator";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login Page/Login";
import Registration from "./components/RegistrationPage/Registration";
import UserDetails from "./components/UserDetails/UserDetail";
import LoanForm from "./components/LoanApplication/LoanForm";
import AboutUs from "./components/AboutUs/AboutUs";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Faq from "./components/AskedQuestions/Faq";
import ViewCustomerDetails from "./components/CustomerDetails/CustomerDetails";
import AdminRejected from "./components/AdminRejected/AdminRejected";
import CarLoanFeatures from "./components/CarLoanFeatures/CarLoanFeatures";
import AdminPending from "./components/AdminPending/AdminPending";
import AdminApproved from "./components/AdminApproved/AdminnApproved";
import AdminAllapplications from "./components/AdminAllapplications/AdminAllapplcations";
import ChangePassword from "./components/changepassword/ChangePassword";
import UserTable from "./components/GetAllUsers/UserTable";
import ViewLoanStatus from "./components/ViewLoanStatus /ViewLoanStatus";
import ThankYouMessage from "./components/ThankYouMessage/ThankYouMessage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<EMICalculator />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/personal-detail" element={<UserDetails />} />
          <Route path="/loan-form" element={<LoanForm />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/admin-pending" element={<AdminPending />} />
          <Route path="/admin-rejected" element={<AdminRejected />} />
          <Route path="/admin-approved" element={<AdminApproved />} />
          <Route
            path="/admin-allApplication"
            element={<AdminAllapplications />}
          />
          <Route path="/carloan-features" element={<CarLoanFeatures />} />
          <Route path="/all-users" element={<UserTable />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/customer-details" element={<ViewCustomerDetails />} />
          <Route path="/view-loan-status" element={<ViewLoanStatus />} />
          <Route exact path="/thank-you" element={<ThankYouMessage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
