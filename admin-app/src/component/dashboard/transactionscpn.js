import { useRouteLoaderData } from "react-router-dom";
import classes from "./transactionscpn.module.css";
import { useEffect, useState } from "react";

const Transaction = () => {
  const dataTrans = useRouteLoaderData("dashboard");
  const [dataDisplay, setDataDisplay] = useState([]);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);
  const itemPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  //hàm hiển thị tối đa 8 phần tử
  const displayTrans = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const maxDataTrans = dataTrans[1].transaction.slice(startIndex, endIndex);
    console.log(maxDataTrans.length);
    setStartIndex(startIndex);
    setEndIndex(endIndex);
    setDataDisplay(maxDataTrans);
  };
  //hàm thực hiện hành động quay về trang sau
  const nextPage = () => {
    if (endIndex >= dataTrans[1].transaction.length) {
      alert("Bạn đã xem đến trang cuối!");
    } else {
      setCurrentPage(currentPage + 1);
      displayTrans(currentPage);
    }
  };
  //hàm thực hiện hành động quay về trang trước
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      displayTrans(currentPage);
    }
  };
  useEffect(() => {
    displayTrans(currentPage);
  }, [currentPage]);
  console.log(currentPage);
  return (
    <div className={classes.transaction}>
      <p>Latest Transactions</p>
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
      {/* phân trang */}
      <div className={classes.pageNumber}>
        <p>
          {startIndex + 1}-
          {endIndex > dataTrans[1].transaction.length ? "end" : endIndex} of{" "}
          {dataTrans[1].transaction.length}
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
  );
};
export default Transaction;
