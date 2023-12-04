
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import Navbar from "./pages/navbar/index.jsx";
import Home from './pages/homePage/index.jsx';
import Login from './pages/authPage/Login.jsx';
import Register from "./pages/authPage/Register.jsx";
import Profile from './pages/profilePage';
import Widget from "./components/Widget.jsx";
import PostWidget from "./components/PostWidget.jsx";
import axios from "axios";
import { BASE_URL } from "./config.js";
import { setLogin } from "./store/index.js";
import { useEffect } from "react";

function App() {

  const authChecked = Boolean(useSelector((state) => state.token));

  return (
    <>
      <div
        style={{  backgroundColor: "#eeeeee" }}
      >
        <Navbar />
        <InitUser />
        <Routes>
          <Route path={"/home"} element={authChecked ? <Home /> : <Navigate to="/login" />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={"/profile/:userId"} element={authChecked ? <Profile /> : <Navigate to="/login" />} />
          
          
        </Routes>
      </div>
    </>
  )
}

function InitUser() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  console.log(token)
  const init = async() => {
    try{
      const response = await axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization : `Bearer ${token}`,
        },
      });   
      console.log(response.data.user)
    if(response.data.user) {
      dispatch(
        setLogin({
            user: response.data.user,
            token: token,
        })
    );
    }else{
      dispatch(
        setLogin({
            user: null,
            token: null,
        })
    );
    }
    
    }
    catch(e) {
      dispatch(
        setLogin({
            user: null,
            token: null,
        })
    );
    }
  }

  useEffect(() => {
    init();
  }, []);

  return <></>

}

export default App;
