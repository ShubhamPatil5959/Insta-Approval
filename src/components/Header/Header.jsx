import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import profile icon
import image from "./logo.webp";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const Header = () => {
  const [UserLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setuserEmail] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For the profile menu
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setuserEmail(localStorage.getItem("email"));

    const adminStatus = localStorage.getItem("isAdmin");
    // setIsAdmin(adminStatus)
    setIsAdmin(adminStatus === "true");
  }, [UserLoggedIn]);

  // useEffect(() => {
  //   const handleStorageChange = (e) => {
  //     if (e.key === "token") {
  //       setIsLoggedIn(!!localStorage.getItem("token"));
  //     }
  //     if (e.key === "isAdmin") {
  //       setIsAdmin(localStorage.getItem("isAdmin") === "true");
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const handleLogout = () => {
    setuserEmail(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("loanApplicationId");
    setAnchorEl(null); // Close the profile menu when logging out
    navigate("/");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  var partBeforeAtSymbol;
  if (userEmail) {
    const parts = userEmail.split("@");

    // The part before "@" is in parts[0]
    partBeforeAtSymbol = parts[0];
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            {/* <CarRentalIcon
              onClick={() => {
                navigate("/");
              }}
              style={{ justifyContent: "center" }}
            /> */}
            <img
              src={image}
              alt="Description of the image"
              width="300"
              height="50"
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>

          <Box>
            {userEmail === null ? (
              <>
                {location.pathname !== "/register" && userEmail === null && (
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                )}
                {location.pathname !== "/login" && userEmail === null && (
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                )}
              </>
            ) : (
              <>
                {isAdmin ? (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/admin-dashboard"
                    >
                      Admin Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/all-users">
                      View Users
                    </Button>
                    {/* <AdminPanelSettingsIcon></AdminPanelSettingsIcon> */}
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/view-loan-status"
                    >
                      View Loan Status
                    </Button>
                  </>
                )}
                {/* Profile Icon and Menu */}
                <IconButton
                  aria-label="profile"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <span style={{ color: "orange", fontWeight: "700" }}>
                  Welcome {userEmail ? partBeforeAtSymbol : null} !
                </span>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      // Handle "Change Password" click
                      navigate("/change-password");
                      // Replace with the appropriate action
                      handleProfileMenuClose();
                    }}
                  >
                    Change Password
                  </MenuItem>
                  {isAdmin === false && (
                    <MenuItem
                      onClick={() => {
                        // Handle "View Profile" click
                        // Replace with the appropriate action
                        navigate("/customer-details");

                        handleProfileMenuClose();
                      }}
                    >
                      View Profile
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
            <Button component={Link} to="/about-us" color="inherit">
              About Us
            </Button>
            <Button>
              <div id="google_translate_element"></div>
            </Button>
            {/* <Button component={Link} to="/Faq" color="inherit">
              FAQ
            </Button> */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
