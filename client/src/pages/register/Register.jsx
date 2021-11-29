import React from "react";
import "./register.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const username = useRef(); // reference to the Input (we have access to the input like this)
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const serverURL = "http://localhost:8800/api/";
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(`${serverURL}auth/register`, user);
        // history.push(`${serverURL}auth/login`);
        navigate("login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">mySocial</h3>
          <span className="loginDesc">
            Connect with friends around the world on mySocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="Password again"
              type="password"
              required
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button className="loginRegisterButton">
              Log into your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
