import { useNavigate, useSearchParams } from "react-router-dom";
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
  const isLogin = searchParams.get("mode") === "login";
  console.log(message);
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  //hàm đăng kí
  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log("signup");
    const response = await fetch(`http://localhost:5000/signup`, {
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

  //hàm đăng nhập
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed! Please try again."); // Thông báo lỗi mặc định
      }

      const resData = await response.json();
      console.log(resData);
      if (resData.isAdmin) {
        setMessage(resData);
      } else if (!resData.token) {
        setMessage(resData);
      } else {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("username", resData.username);
        localStorage.setItem("_id", resData._id);
        navigate("/");
        return;
      }
    } catch (error) {
      setMessage({ error: error.message }); // Hiển thị thông báo lỗi từ server
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
          // value={formData.username}
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          // value={formData.password}
          onChange={inputChangeHandler}
        />
        {message && <p>{message.message}</p>}
        <button type="submit" onClick={isLogin ? loginHandler : signUpHandler}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
export default LoginPage;

// export async function action({ request }) {
//   const data = await request.formData();
//   const authData = {
//     username: data.get("username"),
//     password: data.get("password"),
//   };

//   try{
//     const response = await fetch('http://localhost:5000/login', { method: "POST",headers: { 'Content-Type': 'application/'}})
//   }
// }
