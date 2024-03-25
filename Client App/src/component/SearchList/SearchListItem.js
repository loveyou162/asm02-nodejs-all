import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchListItem.css";
import { useDispatch } from "react-redux";
import { searchAction } from "../../store/resultSearchSlice";
const SearchListItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHotelId = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/detail-hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: props.hotelId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }
    const resData = await response.json();
    dispatch(searchAction.setDetailHotel(resData));
    navigate(`/search/${props.hotelId}`);
  };
  return (
    <div className="searchListItem">
      <div className="searchItem-left">
        <img src={props.image} alt={props.name} />
        <div className="searchListItemBox">
          <h2>{props.name}</h2>
          <p>{props.distance}m from center</p>
          <p className="tag">{props.tag}</p>
          <h4 className="desc">{props.description}</h4>
          <p className="detail">
            {props.descRoom} • {props.titleRoom}
          </p>
          <div
            className={`free_cancels ${
              props.free_cancel ? "action" : "noAction"
            }`}
          >
            <h4>Free cancelation</h4>
            <p>You can cancel later, so lock in this great</p>
          </div>
        </div>
      </div>
      <div className="searchItem-right">
        <div className="rate-group">
          <p className="rate_text">{props.rate_text}</p>
          <p className="rate">{props.rate}</p>
        </div>
        <div className="price-group">
          <p className="price">${props.price}</p>
          <p className="price_text">Includes taxes and fees</p>
          <button className="button-see" onClick={submitHotelId}>
            See availablility
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
