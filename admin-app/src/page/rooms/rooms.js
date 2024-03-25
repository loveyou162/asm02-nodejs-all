import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import classes from "./rooms.module.css";
import { useDispatch } from "react-redux";
import { hotelDataAction } from "../../store/hotelData";

const Hotel = () => {
  const token = localStorage.getItem("token");
  const allRoom = useLoaderData();
  console.log(allRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitEditHandle = async (e) => {
    e.preventDefault();
    const id = e.target.elements.id.value;
    try {
      const response = await fetch(`http://localhost:5000/edit-room/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Xử lý phản hồi từ server (nếu cần)
      const data = await response.json();
      console.log(data);
      dispatch(hotelDataAction.setInputRoom(data));
      navigate("/new-room?mode=edit");
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };
  return (
    <>
      {token && (
        <div className={classes.rooms}>
          <div className={classes.boxTitle}>
            <p>Rooms List</p>
            <Link to="/new-room">Add Room</Link>
          </div>
          <table className={classes.tableRooms}>
            <thead>
              <tr className={classes.theader}>
                <th>
                  <input type="checkbox" id="selectAll" />
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allRoom.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>{item.price}</td>
                  <td>{item.maxPeople}</td>
                  <td>
                    <Form
                      method="post"
                      action="/rooms"
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
export async function loader() {
  const response = await fetch("http://localhost:5000/all-rooms");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  // console.log(resData);
  return resData;
}

//thực hiện hành động xóa room
export async function action({ request }) {
  const data = await request.formData();
  const id = data.get("id");
  console.log(id);
  const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
  if (isConfirmed) {
    const response = await fetch("http://localhost:5000/delete-room", {
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
  return redirect("/rooms");
}
