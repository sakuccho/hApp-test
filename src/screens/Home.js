/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Header } from "../components";
import "./assets/styles/base.css";

const Home = () => {

  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/hApp-test/Login" />
  } else {
    return (
      <div>
        <Header />
        <div className="bodyContainer">
          <h1>Home</h1>
          <footer>
          </footer>
        </div>
      </div>
    );
  }
};


export default Home;
