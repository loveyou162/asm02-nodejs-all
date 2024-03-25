import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./login.module.css";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const isLogin = searchParams.get("mode") === "login";

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //hàm đăng ký gọi đến api signupAdmin
  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log("signup");
    const response = await fetch(`http://localhost:5000/signupAdmin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Không thể kết nối");
    }
    const resData = await response.json();
    if (resData.message) {
      setMessage(resData);
      return;
    }
  };
  //hàm đăng nhập gọi đến api login
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("lỗi kết nối");
    }
    const resData = await response.json();
    //nếu isAdmin = true(đúng là tài khoản admin) chuyển hướng đến trang home và lưu các dữ liệu vào localStorage
    if (resData.isAdmin) {
      localStorage.setItem("token", resData.token);
      localStorage.setItem("username", resData.username);
      localStorage.setItem("_id", resData._id);
      navigate("/");
      return;
    } else {
      setMessage(resData);
    }
  };
  console.log(message);
  return (
    <div className={classes["login-page"]}>
      <form method="post" className={classes["login-form"]}>
        <h1>{isLogin ? "Login" : "Sign up"}</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={inputChangeHandler}
        />
        {message && <p>{message.message}</p>}
        <button type="submit" onClick={isLogin ? loginHandler : signUpHandler}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <Link to={isLogin ? "?mode=signup" : "?mode=login"}>
          {isLogin
            ? "Nếu bạn chưa có tài khoản, hãy tạo tài khoản!"
            : "Bạn đã có tài khoản, vui lòng đăng nhập!"}
        </Link>
      </form>
    </div>
  );
};
export default LoginPage;
