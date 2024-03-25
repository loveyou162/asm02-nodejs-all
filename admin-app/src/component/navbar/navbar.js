import { Link, useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  //hàm đăng xuất
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login?mode=login");
  };
  return (
    <div className={classes["navbar"]}>
      <div className={`${classes.box} ${classes["box-main"]}`}>
        <h4>Main</h4>
        <ul className={classes["list-menu"]}>
          <li>
            <Link to="/">
              <ion-icon name="grid-outline"></ion-icon>
              <p>Dashboard</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classes.box} ${classes["box-list"]}`}>
        <h4>List</h4>
        <ul className={classes["list-menu"]}>
          <li>
            <Link to="/ ">
              <ion-icon name="person-outline"></ion-icon>
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link to="/hotels">
              <ion-icon name="storefront-outline"></ion-icon>
              <p>Hotel</p>
            </Link>
          </li>
          <li>
            <Link to="/rooms">
              <ion-icon name="card-outline"></ion-icon>
              <p>Rooms</p>
            </Link>
          </li>
          <li>
            <Link to="/transaction">
              <ion-icon name="wallet-outline"></ion-icon>
              <p>Transaction</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classes.box} ${classes["box-main"]}`}>
        <h4>New</h4>
        <ul className={classes["list-menu"]}>
          <li>
            <Link to="/new-hotel?mode=add">
              <ion-icon name="storefront-outline"></ion-icon>
              <p>New Hotel</p>
            </Link>
          </li>
          <li>
            <Link to="/new-room?mode=add">
              <ion-icon name="card-outline"></ion-icon>
              <p>New Room</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${classes.box} ${classes["box-main"]}`}>
        <h4>User</h4>
        <ul className={classes["list-menu"]}>
          <li>
            <button onClick={logoutHandler}>
              <ion-icon name="log-in-outline"></ion-icon>
              {token ? <p>Logout</p> : <p>Login</p>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
