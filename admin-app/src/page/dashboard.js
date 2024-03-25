import InfoBoard from "../component/dashboard/infoBoard";
import Transaction from "../component/dashboard/transactionscpn";
// import classes from "./dashboard.module.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && (
        <>
          {" "}
          <InfoBoard />
          <Transaction />
        </>
      )}
    </>
  );
};
export default Dashboard;
export async function loader() {
  const response = await fetch("http://localhost:5000/get-all-data");
  if (!response.ok) {
    throw new Error("Lỗi kết nối!");
  }
  const resData = await response.json();
  // console.log(resData);
  return resData;
}
