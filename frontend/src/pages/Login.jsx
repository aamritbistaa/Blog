import React, { useContext, useState } from "react";
import styles from "../styles/Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [click, setClick] = useState(false);
  const toggleClick = () => {
    setClick(!click);
  };

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ value }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.status === 200) {
      alert("login successful");
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/");
      });
    } else {
      alert("login failed.");
    }
  };
  return (
    <div className={styles.wrapper}>
      Have an account?
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={value.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={value.password}
          onChange={(e) => handleChange(e)}
        />
        <button>Login</button>
      </form>
      <div className={styles.wrapper_moreSection}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}>
          <div
            onClick={toggleClick}
            style={{ display: "flex", alignContent: "center" }}>
            <input
              type="checkbox"
              checked={click}
              style={{ marginRight: 5, cursor: "pointer" }}
            />
            Remember me
          </div>
          <Link to={"/reset"}>Forget Password?</Link>
        </div>
        <Link to={"/register"}>Don't have an account?</Link>
      </div>
    </div>
  );
};

export default Login;
