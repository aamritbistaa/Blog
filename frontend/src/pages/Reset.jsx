import React, { useEffect, useState } from "react";
import styles from "../styles/Auth.module.scss";
import { Link } from "react-router-dom";
const Reset = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value);
  };
  useEffect(() => {
    alert("Hello, this is not functional");
  }, []);

  return (
    <div className={styles.wrapper}>
      Cant remember Password?
      <h2>Reset</h2>
      <form onSubmit={handleSubmit}>
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
        <button>Reset</button>
      </form>
      <div className={styles.wrapper_moreSection}>
        <Link to={"/login"}>Back to login</Link>
      </div>
    </div>
  );
};

export default Reset;
