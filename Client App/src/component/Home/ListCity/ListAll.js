import React from "react";
import ListCity from "./ListCity";
import ListHotel from "./ListHotel";
const ListAll = () => {
  return (
    <div style={{ marginTop: "24px" }}>
      <ListCity />
      <ListHotel />
    </div>
  );
};
export default ListAll;
