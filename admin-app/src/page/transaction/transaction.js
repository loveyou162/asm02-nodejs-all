import { useLoaderData } from "react-router-dom";
import classes from "./transaction.module.css";
import { useEffect, useState } from "react";

const Transaction = () => {
  const dataTrans = useLoaderData();
  const token = localStorage.getItem("token");

  const [dataDisplay, setDataDisplay] = useState([]);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);
  const itemPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const displayTrans = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const maxDataTrans = dataTrans.slice(startIndex, endIndex);
    console.log(maxDataTrans);
    setStartIndex(startIndex);
    setEndIndex(endIndex);
    setDataDisplay(maxDataTrans);
  };

  const nextPage = () => {
    if (endIndex >= dataTrans.length) {
      alert("Bạn đã xem đến trang cuối!");
    } else {
      setCurrentPage(currentPage + 1);
      displayTrans(currentPage);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      displayTrans(currentPage);
    }
  };
  useEffect(() => {
    displayTrans(currentPage);
  }, [currentPage]);
  //   console.log(currentPage);
  return (
    <>
      {token && (
        <div className={classes.transaction}>
          <p>Transactions List</p>
          <table className={classes.tableTransaction}>
            <thead>
              <tr className={classes.theader}>
                <th>
                  <input type="checkbox" id="selectAll" />
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataDisplay.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.userId.username}</td>
                  <td>{item.hotel.name}</td>
                  <td>{item.room.join(", ")}</td>
                  <td>{`${item.dateStart} - ${item.dateEnd}`}</td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <p>{item.status}</p>
                  </td>
                </tr>
              ))}

              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
          <div className={classes.pageNumber}>
            <p>
              {startIndex + 1}-{endIndex > dataTrans.length ? "end" : endIndex}{" "}
              of {dataTrans.length}
            </p>
            <div className={classes["group-button"]}>
              <button onClick={previousPage}>
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <button onClick={nextPage}>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Transaction;
export async function loader() {
  const response = await fetch("http://localhost:5000/all-transaction");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  return resData;
}
