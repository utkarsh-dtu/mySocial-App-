import React from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../dummyData"; // not using dummy data now
// useEffect (executed when component is mounted, and after every update of that component)

// useEffect will run after initial render and after every update
// first initial render and after every update

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext); // this is the current User
  // second arggument is the dependency, means runs this useEffect only once (initial render)
  const serverURL = "http://localhost:8800/api";

  // right now this user id is static

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get(
      //   `${serverURL}/posts/timeline/619a1c563a2612e513bae374`
      // );

      const res = username
        ? await axios.get(`${serverURL}/posts/profile/${username}`)
        : await axios.get(`${serverURL}/posts/timeline/${user._id}`);
      // console.log(res);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </div>
  );
}
