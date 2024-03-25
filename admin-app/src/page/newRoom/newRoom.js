import { useLoaderData, useSearchParams } from "react-router-dom";
import classes from "./newRoom.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
const NewRoomPage = () => {
  const token = localStorage.getItem("token");
  const allHotelTitle = useLoaderData();
  //   console.log(allHotelTitle);
  const dataRoomEdit = useSelector((state) => state.hotel.inputRooms);
  console.log(dataRoomEdit);
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("mode") === "edit";
  console.log(isEdit);
  const [dataInput, setDataInput] = useState({
    title: "",
    price: "",
    desc: "",
    maxPeople: "",
    rooms: "",
  });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(dataInput);
  const url = isEdit
    ? "http://localhost:5000/edit-room"
    : "http://localhost:5000/add-room";
  const addOrEditRoom = async (e) => {
    e.preventDefault();
    const dataArray = dataInput.rooms.split(",");
    console.log(dataArray);
    // Validate formData here
    if (!isEdit) {
      if (
        !dataInput.title ||
        !dataInput.price ||
        !dataInput.desc ||
        !dataInput.maxPeople ||
        !dataInput.rooms
      ) {
        alert("Vui lòng điền đầy đủ các trường!");
        return false;
      }
    }
    const formSubmit = {
      roomId: isEdit ? dataRoomEdit._id : null,
      title: dataInput.title,
      price: dataInput.price,
      desc: dataInput.desc,
      maxPeople: dataInput.maxPeople,
      roomNumbers: dataArray,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formSubmit),
    });
    if (!response.ok) {
      throw new Error("Fetch error!");
    }
  };

  return (
    <>
      {token && (
        <div className={classes["newHotel"]}>
          <div className={classes.boxTitle}>
            <p>Add New Room</p>
          </div>
          <form className={classes["form-add-hotel"]} method="post">
            <div className={classes["form-info-hotel"]}>
              <div className={classes.boxInputLeft}>
                <div className={classes["group-input"]}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="2 bed room"
                    name="title"
                    defaultValue={
                      isEdit ? dataRoomEdit?.title ?? "" : dataInput.title
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="100"
                    onChange={inputChangeHandler}
                    defaultValue={
                      isEdit ? dataRoomEdit?.price ?? "" : dataInput.price
                    }
                  />
                </div>
              </div>
              <div className={classes.boxInputRight}>
                <div className={classes["group-input"]}>
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    id="desc"
                    name="desc"
                    placeholder="king size bed, 1 bathroom"
                    onChange={inputChangeHandler}
                    defaultValue={
                      isEdit ? dataRoomEdit?.desc ?? "" : dataInput.desc
                    }
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="maxPeople">Max People</label>
                  <input
                    type="text"
                    id="maxPeople"
                    placeholder="3"
                    name="maxPeople"
                    onChange={inputChangeHandler}
                    defaultValue={
                      isEdit
                        ? dataRoomEdit?.maxPeople ?? ""
                        : dataInput.maxPeople
                    }
                  />
                </div>
              </div>
              <div className={classes["group-input-bottom"]}>
                <div className={classes["group-input"]}>
                  <label htmlFor="rooms">Rooms:</label>
                  <textarea
                    id="rooms"
                    name="rooms"
                    rows="3"
                    cols="50"
                    placeholder="give comma between room numbers"
                    onChange={inputChangeHandler}
                    defaultValue={
                      isEdit ? dataRoomEdit?.roomNumbers ?? "" : dataInput.rooms
                    }
                  ></textarea>
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="hotel">Choose a hotel:</label>
                  <select
                    id="hotel"
                    className={classes["selectRoom"]}
                    name="hotel"
                  >
                    {allHotelTitle.map((item) => (
                      <option value={item.title} key={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={addOrEditRoom}>Send</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default NewRoomPage;

//load dữ liệu để lấy tất cả hotel cho select
export async function loader() {
  const response = await fetch("http://localhost:5000/get-all-hotel");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  // console.log(resData);
  return resData;
}
