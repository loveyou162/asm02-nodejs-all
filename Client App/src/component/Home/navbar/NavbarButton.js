import React from "react";
import "./NavbarButton.css";
import { Link, useNavigate } from "react-router-dom";

const NavbarButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentName = localStorage.getItem("username");
  const loginHandler = () => {
    navigate("/login?mode=login");
  };
  const signupHandler = () => {
    navigate("/login?mode=signup");
  };
  const transactionHandler = () => {
    navigate("/transaction");
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("_id");
    navigate("/login?mode=login");
  };

  return (
    <div className="navbar-buton">
      {/* Ấn vào tên trang sẽ quay lại trang chủ(home) */}
      <Link to="/" className="navbar-link">
        Booking Website
      </Link>
      <div className="group-button">
        {token && <p>{currentName}</p>}
        {token ? (
          <button className="Register" onClick={transactionHandler}>
            Transaction
          </button>
        ) : (
          <button className="Register" onClick={signupHandler}>
            Sign up
          </button>
        )}

        {token ? (
          <button className="Login" onClick={logoutHandler}>
            Log Out
          </button>
        ) : (
          <button className="Login" onClick={loginHandler}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarButton;
