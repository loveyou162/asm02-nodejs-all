import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import classes from "./HeaderSearch.module.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../../../store/resultSearchSlice";
function HeaderSearch() {
  const dispatch = useDispatch();
  const dataSearch = useSelector((state) => state.search.searchHotel);
  console.log(dataSearch);
  const navigate = useNavigate();
  //Biến chuyển vị trí cho button
  const [numberSearch, setNumberSearch] = useState({
    citys: "",
    adult: "",
    childrent: "",
    room: "",
  });

  const [inputValue, setInputValue] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  //biến lưu trữ trạng thái
  const [activeDate, setActiveDate] = useState(false);
  //hàm cài đặt trạng thái và set định dạng ngày
  const handleActive = () => {
    setActiveDate(!activeDate);
    // Lấy giá trị ngày định dạng dd/mm/yyyy
    const formattedStartDate = format(state[0].startDate, "dd/MM/yyyy");
    const formattedEndDate = format(state[0].endDate, "dd/MM/yyyy");

    // Hiển thị giá trị ngày trong ô input
    setInputValue(`${formattedStartDate} to ${formattedEndDate}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNumberSearch({
      ...numberSearch,
      [name]: value,
    });
  };
  const allData = {
    citys: numberSearch.citys,
    adult: numberSearch.adult,
    childrent: numberSearch.childrent,
    rooms: numberSearch.room,
  };

  const searchHandler = async () => {
    const response = await fetch("http://localhost:5000/search-hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allData),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch!");
    }
    const resData = await response.json();
    console.log(resData);
    navigate("/Search");
    if (resData.length > 0) {
      dispatch(searchAction.setDataSearch(resData));
    } else {
      dispatch(searchAction.setDataSearch(resData));
    }
    console.log("click");
  };
  console.log(JSON.stringify(allData));
  console.log(numberSearch);

  return (
    <div className={classes["header-search"]}>
      <div className={classes["multi-input"]}>
        <div className={`${classes.box} ${classes["box-query"]}`}>
          <i className={`fa-solid fa fa-bed`}></i>
          <input
            type="text"
            placeholder="Where are you going?"
            name="citys"
            onChange={handleInputChange}
          />
        </div>
        <div className={`${classes.box} ${classes["box-calendar"]}`}>
          <i className={`fa-solid fa fa-calendar`}></i>
          <input
            type="text"
            className={`${classes.btn} ${classes["btn-calendar"]}`}
            name="calendar"
            placeholder="09/09/2023 to 09/09/2023"
            defaultValue={inputValue}
            onClick={handleActive}
          />
          {/* Phần nâng cao */}
          <DateRange
            className={`${classes.date} ${
              activeDate ? classes.ok : classes.none
            }`}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
        <div className={`${classes.box} ${classes["box-number"]}`}>
          <i className={`fa-solid fa fa-female`}></i>
          <div className={classes["box-input"]}>
            <div className={classes["group-input"]}>
              <input
                type="number"
                placeholder="1"
                id="adult"
                name="adult"
                onChange={handleInputChange}
                // value={numberSearch.adult}
                defaultValue="0"
              />
              <label htmlFor="adult">adult </label>
            </div>
            <div className={classes["group-input"]}>
              <input
                type="number"
                placeholder="0"
                id="childrent"
                name="childrent"
                onChange={handleInputChange}
                defaultValue="0"
              />
              <label htmlFor="childrent">childrent</label>
            </div>
            <div className={classes["group-input"]}>
              <input
                type="number"
                placeholder="1"
                id="room"
                name="room"
                // value={numberSearch.room}
                onChange={handleInputChange}
                defaultValue="0"
              />
              <label htmlFor="room">room</label>
            </div>
          </div>
        </div>
        <button
          className={`${classes.btn} ${classes["btn-primary"]}`}
          onClick={searchHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default HeaderSearch;
