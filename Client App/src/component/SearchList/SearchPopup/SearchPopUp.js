import React from "react";
import styles from "./SearchPopUp.module.css";
const SearchPopUp = () => {
  return (
    <div className={styles.search}>
      <h2>Search</h2>
      <form className={styles["search-destination"]}>
        <div className={styles["group-input"]}>
          <label htmlFor="destination">Destination</label>
          <input type="text" id="destination" />
        </div>
        <div className={styles["group-input"]}>
          <label htmlFor="destination">Check-in Date</label>
          <input type="text" placeholder="06/24/2022 to 06/24/2022" />
        </div>
        <div className={styles["group-options"]}>
          <label>Options</label>
          <ul>
            <li>
              <label>Min price per night</label>
              <input type="text" />
            </li>
            <li>
              <label>Max price per night</label>
              <input type="text" />
            </li>
            <li>
              <label>Adult</label>
              <input type="text" placeholder="1" />
            </li>
            <li>
              <label>Children</label>
              <input type="text" placeholder="0" />
            </li>
            <li>
              <label>Room</label>
              <input type="text" placeholder="1" />
            </li>
          </ul>
        </div>
        <button>Search</button>
      </form>
    </div>
  );
};
export default SearchPopUp;
