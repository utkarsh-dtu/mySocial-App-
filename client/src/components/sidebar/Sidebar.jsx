import React from "react";
import "./sidebar.css";

import { AiOutlineUsergroupAdd } from "react-icons/ai";

import * as bs from "react-icons/bs";
// import React from "react";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <bs.BsFillFileEarmarkPostFill className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>

          <li className="sidebarListItem">
            <bs.BsFillChatSquareTextFill className="sidebarIcon" />
            <span className="sidebarListItemText">chats</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsCameraVideoFill className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsPersonLinesFill className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsFillFileEarmarkPostFill className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsQuestionCircleFill className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsFillFileEarmarkPostFill className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsFillCalendarEventFill className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <bs.BsFillFileEarmarkPostFill className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          {Users.map((u) => {
            return <CloseFriend key={u.id} user={u} />;
          })}
        </ul>
      </div>
    </div>
  );
}
