import React from "react";
import styles from "./ListHotelLoveItem.module.css";
import { useDispatch } from "react-redux";
import { searchAction } from "../../../../store/resultSearchSlice";
import { Link, useNavigate } from "react-router-dom";
const ListHotelLoveItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHotelId = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/detail-hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: props.id,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }
    const resData = await response.json();
    dispatch(searchAction.setDetailHotel(resData));
    navigate(`/detail/${props.id}`);
  };
  return (
    <div className={styles["hotel-love-item"]} onClick={submitHotelId}>
      <img src={props.image} alt="" />
      <div className={styles["list-hotel-info"]}>
        {/* <Link to={`/detail/${props.id}`}>{props.name}</Link> */}
        <p>{props.name}</p>
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
