
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "./pages/navbar/index.jsx";
import Home from './pages/homePage/index.jsx';
import Login from './pages/authPage/Login.jsx';
import Register from "./pages/authPage/Register.jsx";
import Profile from './pages/profilePage';
import Widget from "./components/Widget.jsx";
import PostWidget from "./components/PostWidget.jsx";

function App() {

  const authChecked = Boolean(useSelector((state) => state.token));

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Navbar />
        <Routes>
          <Route path={"/home"} element={authChecked ? <Home /> : <Navigate to="/login" />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={"/profile/:userId"} element={authChecked ? <Profile /> : <Navigate to="/login" />} />
          {/* <Route path="/post" element={<PostWidget />} /> */}
          
        </Routes>
      </div>
    </>
  )
}

export default App;
