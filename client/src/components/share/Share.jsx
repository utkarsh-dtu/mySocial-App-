// Added Upload feature and it shows the Picture in a clean fashion
// Added Functionality to show image before uploading and reload after uploading

import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./share.css";
import * as ai from "react-icons/ai";

import * as bs from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import {
  MdPermMedia,
  MdLabel,
  MdLocationOn,
  MdEmojiEmotions,
} from "react-icons/md";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value, // this is a ref
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      // console.log("here");
      data.append("name", fileName);
      data.append("file", file);

      // console.log(fileName);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log("ERROR! ", err);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log("ERROR! ", error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noUser.png"
            }
            alt=""
          />
          <input
            placeholder={
              "what's in your mind " + user.username.split(" ")[0] + "?"
            }
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <MdCancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        <form
          className="shareBottom"
          onSubmit={submitHandler}
          enctype="multipart/form-data"
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdPermMedia className="shareIcon" style={{ color: "tomato" }} />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <MdLabel className="shareIcon" style={{ color: "blue" }} />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <MdLocationOn className="shareIcon" style={{ color: "green" }} />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions
                className="shareIcon"
                style={{ color: "yellow" }}
              />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
