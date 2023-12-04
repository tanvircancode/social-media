import { Typography, AppBar, Box, Toolbar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  
  const token = useSelector((state) => state.token);
  console.log(token)


  let loggedUserName = "";

  if (token != null) {
    const localStorageData = localStorage.getItem("persist:root");
    const parsedStorageData = JSON.parse(localStorageData);
    const parsedUserData = JSON.parse(parsedStorageData.user) ?? "";
     loggedUserName = parsedUserData.firstName + " " + parsedUserData.lastName;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media
          </Typography>

          {token != null ? (
            <div style={{ marginRight: 20 }}>
              <Typography variant="h6">Hi, {loggedUserName}</Typography>
            </div>
          ) : (
            <div style={{ marginRight: 20 }}>
              <Button
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>

              <Button
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
