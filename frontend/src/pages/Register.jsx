import React, { useState } from "react";
import styles from "../styles/Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ value }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert("Registration failed.");
    }
  };
  return (
    <div className={styles.wrapper}>
      Create an account
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px", width: "100%" }}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={value.firstName}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={value.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input
          placeholder="Username"
          name="username"
          value={value.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Email"
          name="email"
          value={value.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={value.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Register</button>
      </form>
      <div className={styles.wrapper_moreSection}>
        <Link to={"/login"}>Have an account?</Link>
      </div>
    </div>
  );
};

export default Register;
