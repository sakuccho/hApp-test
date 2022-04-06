/* eslint-disable react/jsx-no-target-blank */
import { auth } from "../firebase";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Header } from "../components";

const Home = () => {

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/hApp-test/login");
  };

  if (!user) {
    return <Navigate to="/hApp-test/Login" />
  } else {
    return (
      <>
        <Header />
        <h1>Home</h1>
        <button onClick={handleLogout}>ログアウト</button>
        <footer>
          icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </footer>
      </>
    );
  }
};


export default Home;
