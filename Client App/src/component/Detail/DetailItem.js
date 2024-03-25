import React from "react";
import styles from "./DetailItem.module.css";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";

const DetailItem = (props) => {
  const dispatch = useDispatch();
  const toggleViewForm = () => {
    dispatch(uiAction.setShowReserve());
  };
  return (
    <div className={styles.DetailItem}>
      <div className={styles["info-left"]}>
        <h2>{props.name}</h2>
        <p>
          <i className="fa-solid fa-location-dot"></i>
          {"  " + props.address}
        </p>
        <p className={styles.distance}>
          {`Excellent location - ${props.distance}m from center`}
        </p>
        <p className={styles.price}>
          {`
          Book a stay over $${props.price} at this property and get a free airport taxi
          `}
        </p>
      </div>
      <button className={styles["button-book"]} onClick={toggleViewForm}>
        Reserve or Book Now!
      </button>
    </div>
  );
};
export default DetailItem;
