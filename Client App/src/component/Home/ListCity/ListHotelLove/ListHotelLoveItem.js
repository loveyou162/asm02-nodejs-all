import React from "react";
import styles from "./ListHotelLoveItem.module.css";
const ListHotelLoveItem = (props) => {
  return (
    <div className={styles["hotel-love-item"]}>
      <img src={props.image} alt="" />
      <div className={styles["list-hotel-info"]}>
        <a href="/">{props.name}</a>
        <p className={styles["love-city"]}>{props.city}</p>
        <h4>Starting from ${props.price}</h4>
        <div className={styles["love-rate"]}>
          <p className={styles["rate"]}>{props.rate}</p>
          <p className={styles["type"]}>{props.type}</p>
        </div>
      </div>
    </div>
  );
};
export default ListHotelLoveItem;
