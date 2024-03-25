import { useState } from "react";
import classes from "./formBookHotel.module.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate, useParams } from "react-router-dom";
const FormBookHotel = () => {
  const DataDetail = useSelector((state) => state.search.detailHotel);
  const navigate = useNavigate();
  const defaultValue = localStorage.getItem("username");
  const userId = localStorage.getItem("_id");
  const [selectedRooms, setSelectedRooms] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const selectedHotel = useParams();
  console.log(selectedHotel);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  //dữ liệu từ input form thông tin
  const [inputValue, setInputValue] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
  });
  const handleSelectChange = (event) => {
    // Lấy giá trị được chọn từ sự kiện
    const selectedValue = event.target.value;
    // Lưu giá trị vào state hoặc làm bất cứ điều gì bạn muốn
    setSelectedOption(selectedValue);
  };
  //hàm thực hiện hành động lấy thông tin với input form info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  //hàm thực hiện hành động lấy thông tin với checkbox
  const handleCheckboxChange = (roomId, price) => {
    setSelectedRooms((prevSelectedRooms) => {
      const updateSelectedRooms = {
        ...prevSelectedRooms,
        [roomId]: !prevSelectedRooms[roomId],
      };
      return updateSelectedRooms;
    });
    const updateTotalPrice = calculateTotalPrice(roomId, price);
    setTotalPrice(updateTotalPrice);
  };
  console.log(selectedHotel);

  // Hàm tính tổng giá tiền dựa trên checkbox đã chọn
  const calculateTotalPrice = (roomId, price) => {
    // const startDate = state[0].startDate;
    // const endDate = state[0].endDate;
    // // Chênh lệch giữa hai ngày tính bằng milliseconds
    // const timeDifference = endDate.getTime() - startDate.getTime();

    // // Chuyển đổi chênh lệch từ milliseconds sang số ngày
    // const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    // console.log(daysDifference);
    const isSelected = selectedRooms[roomId];

    return isSelected ? totalPrice - price : totalPrice + price;
  };
  //hàm submit dữ liệu
  const handleReserveNow = async (e) => {
    e.preventDefault();
    // Lấy giá trị ngày định dạng dd/mm/yyyy
    const formattedStartDate = format(state[0].startDate, "dd/MM/yyyy");
    const formattedEndDate = format(state[0].endDate, "dd/MM/yyyy");
    // Gửi thông tin đặt phòng đến backend
    const reservationData = {
      userId: userId,
      dateStart: formattedStartDate,
      dateEnd: formattedEndDate,
      selectedRooms: Object.keys(selectedRooms).filter(
        (roomId) => selectedRooms[roomId]
      ),
      price: totalPrice,
      hotel: selectedHotel.hotelId,
      inputValue,
      payment: selectedOption,
    };

    const request = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData),
    });

    if (!request.ok) {
      throw new Error("Không thể gửi dữ liệu!");
    }
    console.log("Reservation Data:", reservationData);
    alert("Đã tạo giao dịch thành công!");
    navigate("/search");
  };
  return (
    <div className={classes.formBookHotel}>
      <div className={classes.formInfo}>
        {/* lịch */}
        <div className={classes.dates}>
          <h2>Dates</h2>
          <DateRange
            className={`${classes.date}`}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
        {/* form thông tin */}
        <div className={classes.reserveInfo}>
          <h2>Reserve Info</h2>
          <div className={classes.boxInput}>
            <div className={classes["group-input"]}>
              <label htmlFor="fullname">Your Full Name:</label>
              <input
                type="text"
                placeholder="Full name"
                id="fullname"
                name="fullname"
                onChange={handleInputChange}
              />
            </div>
            <div className={classes["group-input"]}>
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                defaultValue={defaultValue}
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className={classes["group-input"]}>
              <label htmlFor="phoneNumber">Your Phone Number:</label>
              <input
                type="number"
                placeholder="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleInputChange}
              />
            </div>
            <div className={classes["group-input"]}>
              <label htmlFor="cardNumber">Your Identity Card Number:</label>
              <input
                type="number"
                id="cardNumber"
                placeholder="Card Number"
                name="cardNumber"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* chọn phòng */}
      <div className={classes.selectRoom}>
        <h2>Select Rooms</h2>
        <div className={classes.containerRoom}>
          {DataDetail.rooms.map((room) => (
            <div className={classes.selectedRoom} key={room._id}>
              <div className={classes.selectedInfo}>
                <h4>{room.title}</h4>
                <p className={classes.dateNote}>
                  Pay nothing until September 04, 2024
                </p>
                <p className={classes.maxPeople}>
                  Max people: <b>{room.maxPeople}</b>
                </p>
                <p className={classes.singerPrice}>${room.price}</p>
              </div>
              <div className={classes.boxRoomNumber}>
                {room.roomNumbers.map((item) => (
                  <div className={classes.roomNumber}>
                    <label className={classes.numberItem}>{item}</label>
                    <input
                      type="checkbox"
                      checked={selectedRooms[item] || false}
                      onChange={() => handleCheckboxChange(item, room.price)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.totalBill}>
        <h1>Total Bill: ${totalPrice}</h1>
        <form onSubmit={handleReserveNow}>
          <select
            id="payment"
            name="payment"
            className={classes.payment}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button type="submit" className={classes["button-book"]}>
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormBookHotel;
