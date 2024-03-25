import classes from "./transaction.module.css";
import { useLoaderData } from "react-router-dom";

const Transaction = () => {
  const transactionData = useLoaderData();
  console.log(transactionData);

  return (
    <div className={classes.Transaction}>
      <h3>Your transaction</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((trans, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{trans.hotel.name}</td>
              <td>{trans.room.join(", ")}</td>
              <td>{`${trans.dateStart} - ${trans.dateEnd}`}</td>
              <td>${trans.price}</td>
              <td>{trans.payment}</td>
              <td>{trans.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transaction;

export async function loader() {
  try {
    const response = await fetch("http://localhost:5000/transaction");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
