import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/Create.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const Edit = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [files, setFiles] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    console.log(id);
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("id", id);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const res = await fetch("http://localhost:8000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      navigate(`/post/${id}`);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        console.log(postInfo);
        setContent(postInfo.content);
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="summary"
            value={summary}
            name="summary"
            onChange={(e) => setSummary(e.target.value)}
          />
          <input type="file" onChange={(e) => setFiles(e.target.files)} />
          <div>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={content}
              onChange={(e) => setContent(e)}
            />
          </div>
          <button>Create post</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
