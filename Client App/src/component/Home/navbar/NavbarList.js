import React from "react";
import "./NavbarList.css";
import NavbarItem from "./NavbarItem";
const NavbarList = (props) => {
  //   console.log(props);

  return (
    <div className="navbar-list">
      {props.items.map((item, index) => (
        <NavbarItem
          icon={item.icon}
          type={item.type}
          active={item.active}
          key={index}
        />
      ))}
    </div>
  );
};
export default NavbarList;
