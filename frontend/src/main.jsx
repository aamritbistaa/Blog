import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Reset from "./pages/Reset.jsx";
import Home from "./pages/Home.jsx";
import { UserContextProvider } from "./UserContext.jsx";
import About from "./pages/About.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Edit from "./pages/Edit.jsx";
TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
