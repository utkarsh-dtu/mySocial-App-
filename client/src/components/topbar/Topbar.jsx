import "./topbar.css";
// import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
// import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineNotification,
} from "react-icons/ai";
import { BsFillPersonFill, BsFillChatLeftDotsFill } from "react-icons/bs";
import React from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">mySocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <AiOutlineSearch className="searchIcon" />
          <input
            placeholder="search for friends, posts or any video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">timeLine</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsFillPersonFill className="personIcon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <BsFillChatLeftDotsFill className="chatIcon" />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <AiOutlineNotification className="notificationIcon" />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noUser.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
