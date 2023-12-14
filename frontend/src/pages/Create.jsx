import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "../styles/Create.module.scss";
import { useNavigate } from "react-router-dom";
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
const Create = () => {
  const [value, setValue] = useState({
    title: "",
    summary: "",
    content: "",
  });
  const [files, setFiles] = useState("");
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("title", value.title);
    data.set("summary", value.summary);
    data.set("file", files[0]);
    data.set("content", value.content);
    e.preventDefault();
    const res = await fetch("http://localhost:8000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      navigate("/");
    }
    console.log(await res.json());
  };

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={value.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="summary"
            value={value.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="file"
            value={value.file}
            onChange={(e) => setFiles(e.target.files)}
          />
          <div>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={value.content}
              onChange={(e) => setValue({ ...value, content: e })}
            />
          </div>
          <button>Create post</button>
        </form>
      </div>
    </>
  );
};

export default Create;
