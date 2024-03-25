import React from "react";
// import "./NavbarItem.css";
import "./NavbarItem.css";
const NavbarItem = (props) => {
  return (
    <div className="navbar-item">
      <a href="/" className={`nav-item ${props.active ? "active" : ""}`}>
        <i className={`fa-solid ${props.icon}`}></i>
        <p>{props.type}</p>
      </a>
    </div>
  );
};
export default NavbarItem;
