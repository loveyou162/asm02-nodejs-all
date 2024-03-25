import React from "react";
import styles from "./ListCityItem.module.css";

const ListCityItem = (props) => {
  return (
    <div className={styles.CityItem}>
      <img src={props.image} alt={props.name} />
      <div className={styles["group-item"]}>
        <h1>{props.name}</h1>
        <h2>{props.subText} properties</h2>
      </div>
    </div>
  );
};
export default ListCityItem;
