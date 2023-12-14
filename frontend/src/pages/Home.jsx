import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.scss";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/post", {
      method: "GET",
    }).then((res) => {
      res.json().then((post) => {
        setPosts(post);
      });
    });
  }, []);
  const TruncatedContent = ({ content, maxLength = 240 }) => {
    if (content.length > maxLength) {
      const truncatedContent = content.substring(0, maxLength) + "...";

      return truncatedContent;
    }
    return content;
  };
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {postMessage.length > 0 &&
          posts.map((item) => (
            <div className={styles.wrapper_item}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    `http://localhost:8000/` + item.fileName.replace("\\", "/")
                  }
                  alt="image"
                />
              </div>
              <div className={styles.wrapper_item_details}>
                <h3>
                  <Link to={`/post/${item._id}`}>{item.title}</Link>
                </h3>
                <div className={styles.wrapper_item_details_time}>
                  <ReactTimeAgo date={item.createdAt} locale="en-US" />

                  <span>@{item.author.username}</span>
                </div>
                <div>
                  <TruncatedContent content={item.summary} />
                  <span
                    style={{ color: "white", fontWeight: 400, marginLeft: 5 }}>
                    <Link to={`/post/${item._id}`}>More</Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
