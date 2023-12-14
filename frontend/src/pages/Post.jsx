import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { UserContext } from "../UserContext";
import Navbar from "../components/Navbar";
import styles from "../styles/Post.module.scss";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  const deleteItem = async () => {
    const res = await fetch(`http://localhost:8000/post/${id}`, {
      method: "Delete",
      params: id,
      credentials: "include",
    });

    if (res.ok) {
      navigate("/");
    }
  };
  if (!postInfo) return "";
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.container_wrapper}>
          <div className={styles.container_wrapper_left}>
            <img
              src={
                `http://localhost:8000/` + postInfo.fileName.replace("\\", "/")
              }
              alt=""
              srcset=""
              height={250}
              width={250}
            />
          </div>
          <div className={styles.wrapper_right}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <h2>{postInfo.title}</h2>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <h4>Published on:</h4>
                <div>{postInfo.createdAt.replace("T", " ").split(" ")[0]}</div>
                <div>
                  <ReactTimeAgo date={postInfo.createdAt} locale="en-US" />
                </div>
                <h3>by @ {postInfo.author.username}</h3>
              </div>
              {userInfo?.id && userInfo.id == postInfo.author._id && (
                <div className={styles.buttonwrapper}>
                  <button>
                    <Link to={"/edit/" + id}>Edit</Link>
                  </button>
                  <button onClick={deleteItem}>Delete</button>
                </div>
              )}
            </div>

            <p style={{ padding: "10px 0px", fontWeight: 500 }}>
              {postInfo.summary}
            </p>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
