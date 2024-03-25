import React, { useEffect, useState } from "react";
import ListHotelTypeItem from "./ListHotelTypeItem";
import styles from "./ListHotelType.module.css";
import { useRouteLoaderData } from "react-router-dom";

const ListHotelType = () => {
  const quantityHotel = useRouteLoaderData("home");
  return (
    <div className={styles["list-container"]}>
      <h2>Browse by property type</h2>
      <div className={styles["list-type"]}>
        {quantityHotel[0].quantityHotels.map((type, index) => (
          <ListHotelTypeItem
            name={type.name}
            count={type.quantity}
            image={type.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default ListHotelType;
