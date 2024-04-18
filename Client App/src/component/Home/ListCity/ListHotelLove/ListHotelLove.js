import React from "react";
import ListHotelLoveItem from "./ListHotelLoveItem";
import styles from "./ListHotelLove.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAction } from "../../../../store/resultSearchSlice";

const ListHotelLove = () => {
  const dispatch = useDispatch();
  const hotelRatingTallest = useRouteLoaderData("home");
  console.log(hotelRatingTallest[2]);
  dispatch(searchAction.setDetailHotel(hotelRatingTallest[2]));
  return (
    <div className={styles["list-hotel-love-container"]}>
      <h2>Homes guests love</h2>
      <div className={styles["list-hotel-love"]}>
        {hotelRatingTallest[2].ratingTallesHotel.map((love, index) => (
          <ListHotelLoveItem
            id={love._id}
            image={love.photos[0]}
            name={love.name}
            city={love.city}
            price={love.cheapestPrice}
            rate={love.rating}
            type={love.type}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default ListHotelLove;
