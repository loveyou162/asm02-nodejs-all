import React from "react";
import "./HeaderTop.css";
import { useNavigate } from "react-router-dom";
function HeaderTop() {
  const navigate = useNavigate();
  const signInNavigate = () => {
    navigate("/login?mode=signup");
  };
  return (
    <div className="HeaderTop">
      <h1>A lifetime of discounts? It's Genius</h1>
      <p>
        Get rewarded for your travels - unlocked instant saving of 10% or more
        with a free account
      </p>
      <button onClick={signInNavigate}>Sign in / Register</button>
    </div>
  );
}
export default HeaderTop;
