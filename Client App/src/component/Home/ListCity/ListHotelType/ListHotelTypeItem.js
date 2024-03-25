import React from "react";
import styles from "./ListHotelTypeItem.module.css";
const ListHotelTypeItem = (props) => {
  return (
    <div className={styles["list-hotel-item"]}>
      <img src={props.image} alt={props.name} />
      <div className={styles["list-hotel-info"]}>
        <h3>{props.name}</h3>
        <p>{props.count} hotels</p>
      </div>
    </div>
  );
};
export default ListHotelTypeItem;
