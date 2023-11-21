import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";


export default function Widget() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

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

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, lastName } = user;

  return (
    <Box style={{ padding: '2em', backgroundColor: '#FFFFFF', borderRadius: '0.5em' }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: '2px'
      }}>
        <img src={picturePath} style={{ width: 50, height: 50,objectFit: "cover", borderRadius: "50%" }} alt="user" />
        <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              style={{
                  cursor: "pointer",
              }}
            >
              {firstName} {lastName}
            </Typography>
      </div>

      <Card
        variant="outlined"
        style={{
          width: 300,
          padding: 40,
          minHeight: 200,
          margin: 10,
        }}
      >
        <Typography textAlign="center" variant="h4">
          {course.title}
        </Typography>
        <Typography textAlign="center" variant="h6">
          {course.description}
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          {course.price}
        </Typography>
        <img
          src={course.imageLink}
          style={{ width: 300, height: 250, objectFit: "cover" }}
        />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          {role == "admin" ? (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/course/" + course._id);
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/purchasecourse/" + course._id);
              }}
            >
              Buy
            </Button>
          )}
        </div>
      </Card>
    </Box>
  );
}