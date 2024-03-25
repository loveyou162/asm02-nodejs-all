import React from "react";
import styles from "./FooterItem.module.css";

const FooterItem = ({ value }) => {
  return (
    <div className={styles["footer-item"]}>
      <a href="/">{value}</a>
    </div>
  );
};

export default FooterItem;
