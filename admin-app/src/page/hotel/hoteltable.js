import {
  Form,
  Link,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "./hoteltable.module.css";
import { useDispatch } from "react-redux";
import { hotelDataAction } from "../../store/hotelData";

const Hotel = () => {
  const allHotel = useRouteLoaderData("hotel");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const submitEditHandle = async (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value;
    try {
      const response = await fetch(`http://localhost:5000/edit-hotel/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Xử lý phản hồi từ server (nếu cần)
      const data = await response.json();
      console.log(data);
      dispatch(hotelDataAction.setInputHotel(data));
      navigate("/new-hotel?mode=edit");
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };

  return (
    <>
      {token && (
        <div className={classes.hotels}>
          <div className={classes.boxTitle}>
            <p>Hotel List</p>
            <Link to="/new-hotel?mode=add">Add Hotel</Link>
          </div>
          <table className={classes.tableHotel}>
            <thead>
              <tr className={classes.theader}>
                <th>
                  <input type="checkbox" id="selectAll" />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Title</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allHotel.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.city}</td>
                  <td>
                    <Form
                      method="post"
                      action="/hotels"
                      className={classes.btnDelete}
                    >
                      <button type="submit">Delete</button>
                      <input type="hidden" value={item._id} name="id" />
                    </Form>
                    <form
                      method="post"
                      className={classes.btnEdit}
                      onSubmit={submitEditHandle}
                    >
                      <button type="submit">Edit</button>
                      <input type="hidden" value={item._id} name="id" />
                    </form>
                  </td>
                </tr>
              ))}
              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Hotel;
//lấy dữ liệu từ api get-all-hotel
export async function loader() {
  const response = await fetch("http://localhost:5000/get-all-hotel");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  return resData;
}

//thực hiện hành động xóa hotel
export async function action({ request }) {
  const data = await request.formData();
  const id = data.get("id");
  console.log(id);
  // hiện popup confirm xác nhận xóa
  const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
  if (isConfirmed) {
    const response = await fetch("http://localhost:5000/delete-hotel", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Fetch Error!");
    }
    const resData = await response.json();
    console.log(resData);
    alert(resData.message);
  }
  return redirect("/hotels");
}
