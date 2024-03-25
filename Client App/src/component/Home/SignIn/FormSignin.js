import React from "react";
import "./FormSignin.css";
const FormSignIn = () => {
  return (
    <div className="form-sign-in">
      <div className="box-signIn">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <form>
          <input type="text" placeholder="Your Email" />
          <button>Subcribe</button>
        </form>
      </div>
    </div>
  );
};

export default FormSignIn;
