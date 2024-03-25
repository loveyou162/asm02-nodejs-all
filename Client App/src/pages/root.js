import Navbar from "../component/Home/navbar/Navbar";
import FormSignIn from "../component/Home/SignIn/FormSignin";
import Footer from "../component/Home/Footer/Footer";
import classes from "./root.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../component/Home/Header/Header";
import { useEffect } from "react";
const RootLayout = function () {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  useEffect(() => {
    if (isLoggedIn) {
      // Điều hướng đến trang home và reload lại trang nếu đã đăng nhập
      navigate("/", { replace: true });
    }
  }, [token, navigate]);
  return (
    <div className={classes.rootLayout}>
      <div className={classes["navbar-container"]}>
        <div className="nav-bar">
          <Navbar />
          {isLoggedIn && <Header />}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
      <FormSignIn />
      <div className="main2">
        <Footer />
      </div>
    </div>
  );
};
export default RootLayout;
