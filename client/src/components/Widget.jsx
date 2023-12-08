import { Card, Typography, useMediaQuery } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../config";
import {
  HomeOutlined,
  LogoutOutlined,
  Person2Outlined,
  ControlPointOutlined,
} from "@mui/icons-material";
import { setLogout, setNewPost } from "../store";

export default function Widget({ userId, picturePath }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const newpost = useSelector((state) => state.newpost);

  const matches = useMediaQuery("(min-width:900px)");
  const matchesMov = useMediaQuery("(max-width:640px)");

  const styleWidget = {
    width: "100%",
    padding: 20,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    margin: 40,
    borderRadius: "0.75rem",
  };
  const styleWidgetMov = {
    width: "100%",
    padding: 20,
    display: "flex",
    justifyContent: "space-around",
    gap: "0.75em",
    borderRadius: "0.75rem",
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    boxSizing: "border-box",
  };

  // const buttonStyle= {

  // }

  const fetchUser = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then(callback1);

    function callback1(res) {   
      res.json().then(callback2);
    }

    function callback2(data) { 
      console.log(data);
      setUser(data);
    }
  };


  const handleCreatePost = () => {
    
    dispatch(
      setNewPost({
        newpost: !newpost,
      })
    );
    
  };

  

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, lastName } = user;

  return (
    <div>
      <Card variant="outlined" style={matches ? styleWidget : styleWidgetMov}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: matches ? "1em" : 0,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <HomeOutlined style={{ fontSize: matchesMov ? 50 : 30 }} />
          <Typography variant="h6" fontWeight="500">
            {matchesMov ? "" : "Home"}
          </Typography>
        </div>

      
        <div
          style={{
            display: "flex",

            alignItems: "center",
            gap: matches ? "1em" : 0,
            cursor: "pointer",
          }}
          onClick={handleCreatePost}
        >
          <ControlPointOutlined style={{ fontSize: matchesMov ? 50 : 30 }} />
          <Typography variant="h6" fontWeight="500">
            {matchesMov ? "" : " Create Post"}
          </Typography>
        </div>

        {matches && (
          <div
            style={{
              display: "flex",

              alignItems: "center",
              gap: matches ? "1em" : 0,
            }}
          >
            <img
              src={`${BASE_URL}/assets/${picturePath}`}
              style={{
                width: 28,
                height: 28,
                objectFit: "cover",
                borderRadius: "50%",
              }}
              alt="user"
            />

            <Typography variant="h6" fontWeight="500">
              {firstName} {lastName}
            </Typography>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: matches ? "1em" : 0,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/profile/${userId}`)}
          
        >
          <Person2Outlined style={{ fontSize: matchesMov ? 50 : 30 }} />
          <Typography variant="h6" fontWeight="500">
            {matchesMov ? "" : "Profile"}
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: matches ? "1em" : 0,
            cursor: "pointer",
          }}
          onClick={() => dispatch(setLogout())}
        >
          <LogoutOutlined style={{ fontSize: matchesMov ? 50 : 30 }} />
          <Typography variant="h6" fontWeight="500">
            {matchesMov ? "" : "Logout"}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
