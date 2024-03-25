import React from "react";
import styles from "./DetailBottom.module.css";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";

const DetailBottom = (props) => {
  const dispatch = useDispatch();
  const toggleViewForm = () => {
    dispatch(uiAction.setShowReserve());
  };
  return (
    <div className={styles.DetailBottom}>
      <div className={styles["DetailBottom-left"]}>
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
      <div className={styles["DetailBottom-right"]}>
        <div className={styles["nine_night"]}>
          <h2>${props.nine_price} </h2>
          <p>(1 night)</p>
        </div>
        <button className={styles["button-book"]} onClick={toggleViewForm}>
          Reserve or Book Now!
        </button>
      </div>
    </div>
  );
};
export default DetailBottom;
