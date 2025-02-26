import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../Header/Header";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [change, setChange] = useState();
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8090/user/getAllUsers");
      setUsers(res.data);
      console.log(users);
    })();
  }, [change]);

  const deleteUser = async (userId) => {
    ///deleteUser/{id}
    try {
      const response = await axios.delete(
        `http://localhost:8090/user/deleteUser/${userId}`
      );
      console.log(response);
      const d = Math.random();
      await setChange(d);
      if (response.status === 200) {
         const d = Math.random();
         await setChange(d);
      }
    } catch (e) {
      console.log("Error while deleting", e);
    }
  };

  const makeAdmin = async (userEmail, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8085/auth/updateUser/${userEmail}`
      );
      console.log(response);
      const d = Math.random();
      await setChange(d);
      await axios.delete(`http://localhost:8090/user/deleteUser/${userId}`);

      if (response.status === 200) {
        const d = Math.random();
        await setChange(d);
      
      }
    } catch (e) {
      console.log("Error while updating admin", e);
    }
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header></Header>

      <div>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", ml: 1 }} />
                ),
              }}
              sx={{ marginBottom: 2, margin: 2 }}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell style={{ fontWeight: "bold" }}>
                  Aadhar Number
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Mobile No</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Make Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.aadharNo}>
                  <TableCell>{user.aadharNo}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile_No}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteUser(user.aadharNo)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => makeAdmin(user.email, user.aadharNo)}
                    >
                      Make Admin
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserTable;
