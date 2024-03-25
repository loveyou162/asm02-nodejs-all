import React from "react";
import "./Home.css";

import ListCity from "../../component/Home/ListCity/ListCity";
import ListHotel from "../../component/Home/ListCity/ListHotel";

const Home = () => {
  return (
    <div style={{ marginTop: "24px" }}>
      <ListCity />
      <ListHotel />
    </div>
  );
};

export default Home;
export async function loader() {
  const response = await fetch("http://localhost:5000/hotel");
  if (!response.ok) {
    throw new Error({ message: "Không thể kết nối!" });
  }
  const resData = await response.json();
  return resData;
}
