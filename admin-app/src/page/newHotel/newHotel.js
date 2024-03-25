import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./newHotel.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
const NewHotelPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dataHotelEdit = useSelector((state) => state.hotel.inputHotel);
  console.log(dataHotelEdit);
  const allRoomTitle = useLoaderData();
  console.log(allRoomTitle);
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("mode") === "edit";
  console.log(isEdit);
  const [dataInput, setDataInput] = useState({
    name: "",
    city: "",
    distance: "",
    desc: "",
    photos: "",
    type: "",
    address: "",
    title: "",
    price: "",
    featured: "",
    rooms: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "rooms") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setDataInput((prevState) => ({ ...prevState, rooms: selectedOptions }));
    } else {
      setDataInput((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  console.log(dataInput);
  const url = isEdit
    ? "http://localhost:5000/edit-hotel"
    : "http://localhost:5000/add-hotel";
  const addOrEditHotelHandle = async (e) => {
    e.preventDefault();
    const dataArray = dataInput.photos.split(",");
    console.log(dataArray);
    //validate dữ liệu
    if (!isEdit) {
      if (
        !dataInput.name ||
        !dataInput.city ||
        !dataInput.distance ||
        !dataInput.desc ||
        !dataInput.photos ||
        !dataInput.type ||
        !dataInput.address ||
        !dataInput.title ||
        !dataInput.price ||
        !dataInput.featured ||
        !dataInput.rooms
      ) {
        alert("Vui lòng điền đầy đủ các trường!");
        return false;
      }
    }
    const formSubmit = {
      hotelId: isEdit ? dataHotelEdit._id : null,
      name: dataInput.name,
      city: dataInput.city,
      distance: dataInput.distance,
      desc: dataInput.desc,
      photos: dataArray,
      type: dataInput.type.toLowerCase(),
      address: dataInput.address,
      title: dataInput.title,
      price: dataInput.price,
      featured: dataInput.featured,
      rooms: dataInput.rooms,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formSubmit),
    });
    if (!response.ok) {
      throw new Error("Fetch error!");
    }
    navigate("/hotels");
  };
  return (
    <>
      {token && (
        <div className={classes["newHotel"]}>
          <div className={classes.boxTitle}>
            <p>Add New Hotel</p>
          </div>
          <form className={classes["form-add-hotel"]} method="post">
            <div className={classes["form-info-hotel"]}>
              <div className={classes.boxInputLeft}>
                <div className={classes["group-input"]}>
                  <label htmlFor="name">Name</label>

                  <input
                    type="text"
                    id="name"
                    placeholder="My Hotel"
                    name="name"
                    onChange={inputChangeHandler}
                    defaultValue={
                      isEdit ? dataHotelEdit?.name ?? "" : dataInput.name
                    }
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                    defaultValue={
                      isEdit ? dataHotelEdit?.city ?? "" : dataInput.city
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="distance">Distance from city center</label>
                  <input
                    type="text"
                    id="distance"
                    name="distance"
                    placeholder="500"
                    defaultValue={
                      isEdit
                        ? dataHotelEdit?.distance ?? ""
                        : dataInput.distance
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    id="desc"
                    name="desc"
                    placeholder="Description"
                    defaultValue={
                      isEdit ? dataHotelEdit?.desc ?? "" : dataInput.desc
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="imageUrl">Image:</label>
                  <textarea
                    id="imageUrl"
                    name="photos"
                    rows="3"
                    cols="50"
                    defaultValue={
                      isEdit ? dataHotelEdit?.photos ?? "" : dataInput.photos
                    }
                    onChange={inputChangeHandler}
                  ></textarea>
                </div>
              </div>
              <div className={classes.boxInputRight}>
                <div className={classes["group-input"]}>
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="hotel"
                    defaultValue={
                      isEdit ? dataHotelEdit?.type ?? "" : dataInput.type
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="address"
                    name="address"
                    defaultValue={
                      isEdit ? dataHotelEdit?.address ?? "" : dataInput.address
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="The best Hotel"
                    defaultValue={
                      isEdit ? dataHotelEdit?.title ?? "" : dataInput.title
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
                    defaultValue={
                      isEdit
                        ? dataHotelEdit?.cheapestPrice ?? ""
                        : dataInput.price
                    }
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className={classes["group-input"]}>
                  <label htmlFor="imageUrl">Featured:</label>
                  <select
                    id="featured"
                    name="featured"
                    defaultValue={
                      isEdit
                        ? dataHotelEdit?.featured ?? ""
                        : dataInput.featured
                    }
                    onChange={inputChangeHandler}
                  >
                    <option>Chọn yes hoặc no</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={classes["group-input-room"]}>
              <label htmlFor="rooms">Rooms:</label>
              <select
                id="rooms"
                className={classes["selectRoom"]}
                name="rooms"
                onChange={inputChangeHandler}
                multiple
              >
                {allRoomTitle.map((item) => (
                  <option value={item.title} key={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={addOrEditHotelHandle}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};
export default NewHotelPage;

//load dữ liệu để lấy tất cả rooms
export async function loader() {
  const response = await fetch("http://localhost:5000/all-rooms");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  return resData;
}
