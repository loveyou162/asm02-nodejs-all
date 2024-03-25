import React from "react";
import styles from "./Footer.module.css";
// import FooterColumn from "./FooterColumn";
import FooterItem from "./FooterItem";
const Dummy_Footer = [
  {
    col_number: 1,
    col_values: [
      "Countries",
      "Regions",
      "Cities",
      "Districts",
      "Airports",
      "Hotels",
    ],
  },
  {
    col_number: 2,
    col_values: [
      "Homes",
      "Apartments",
      "Resorts",
      "Villas",
      "Hostels",
      "Guest houses",
    ],
  },
  {
    col_number: 3,
    col_values: [
      "Unique places to stay",
      "Reviews",
      "Unpacked: Travel articles",
      "Travel communities",
      "Seasonal and holiday deals",
    ],
  },
  {
    col_number: 4,
    col_values: [
      "Car rental",
      "Flight Finder",
      "Restaurant reservations",
      "Travel Agents",
    ],
  },
  {
    col_number: 5,
    col_values: [
      "Curtomer Service",
      "Partner Help",
      "Careers",
      "Sustainability",
      "Press center",
      "Safety Resource Center",
      "Investor relations",
      "Terms & conditions",
    ],
  },
];
const Footer = () => {
  return (
    <div className={styles.footer}>
      {Dummy_Footer.map((column, index) => (
        <FooterColumn key={index} column={column} />
      ))}
    </div>
  );
};

const FooterColumn = ({ column }) => {
  return (
    <div className={`footer-column col-${column.col_number}`}>
      {column.col_values.map((value, index) => (
        <FooterItem key={index} value={value} />
      ))}
    </div>
  );
};

export default Footer;
