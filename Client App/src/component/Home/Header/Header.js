import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderSearch from "./HeaderSearch";
import NavbarList from "../navbar/NavbarList";
const DUMMY_NAVBAR = [
  {
    type: "Stays",
    icon: "fa-bed",
    active: true,
  },
  {
    type: "Flights",
    icon: "fa-plane",
    active: false,
  },
  {
    type: "Car rentals",
    icon: "fa-car",
    active: false,
  },
  {
    type: "Attractions",
    icon: "fa-bed",
    active: false,
  },
  {
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false,
  },
];
function Header() {
  const navbars = DUMMY_NAVBAR;

  return (
    <div>
      <NavbarList items={navbars} />
      <HeaderTop />
      <HeaderSearch />
    </div>
  );
}
export default Header;
