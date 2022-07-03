import { auth } from "../firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./assets/styles/base.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/hApp-test/login");
  };

  return (
    <>
      <button className="logoutButton" onClick={handleLogout}>ログアウト</button>
    </>
  )
}

export default Logout;