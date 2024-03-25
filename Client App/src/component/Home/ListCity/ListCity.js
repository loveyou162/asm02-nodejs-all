import React from "react";
import styles from "./ListCity.module.css";
import ListCityItem from "./ListCityItem";
import { useRouteLoaderData } from "react-router-dom";

const ListCity = () => {
  const listCityData = useRouteLoaderData("home");

  return (
    <div className={styles["list-city"]}>
      {listCityData[1].quantityCity.map((city, index) => (
        <ListCityItem
          name={city.name}
          subText={city.quantity}
          image={city.image}
          key={index}
        />
      ))}
    </div>
  );
};
export default ListCity;
