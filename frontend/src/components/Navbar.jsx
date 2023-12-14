import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
  };
  const username = userInfo?.username;

  return (
    <>
      <div className={styles.wrapper}>
        <h1>
          <Link to={"/"}> Logo</Link>
        </h1>
        <ul>
          <Link to={"/"}>home</Link>
          {username && (
            <>
              <Link to={"/create"}>create</Link>
              <Link onClick={logout}>logout</Link>
            </>
          )}

          {!username && (
            <>
              <Link to={"/login"}>login</Link>
              <Link to={"/register"}>register</Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
