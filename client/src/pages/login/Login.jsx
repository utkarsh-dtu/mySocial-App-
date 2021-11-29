import React from "react";
import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    console.log(email);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">mySocial</h3>
          <span className="loginDesc">
            Connect with friends around the world on mySocial
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? "loading" : "login"}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">
              {isFetching ? "loading" : "Create New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
