import React, { useEffect, useState, useContext } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../../components/online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { AiFillPlusSquare, AiFillMinusCircle } from "react-icons/ai";

export default function Rightbar({ user }) {
  console.log("rightbar user : ", user);
  // console.log("rightbar user city: ", user.city);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const { user: currentUser, dispatch } = useContext(AuthContext);
  // const currentUser = useContext(AuthContext).user;
  // const { dispatch } = useContext(AuthContext);

  // something does not look good here
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  // useEffect(() => {
  //   setFollowed(currentUser.followings.includes(user?._id));
  // }, [currentUser, user?._id]);

  // useEffect(() => {
  //   setFollowed(currentUser.followings.includes(user?._id));

  //   console.log(currentUser._id);
  //   console.log(user?._id);
  // }, [currentUser, user?._id]);

  useEffect(() => {
    // we were not able to use async in useEffect
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [user]);

  // creating my faaltu useEffect
  // useEffect(() => {
  //   const isFollowing = currentUser.followings.includes()
  // });

  const handleClick = async () => {
    console.log("followed : ", followed);
    // console.log("current user :", currentUser);
    try {
      if (followed) {
        await axios.put(
          "http://localhost:8800/api/users/" + user._id + "/unfollow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({
          type: "UNFOLLOW",
          payload: user._id,
        });
      } else {
        // await axios.put("/users/" + user._id + "/follow", {
        //   userId: currentUser._id,
        // });
        // http://localhost:8800/api/users/61ada1f9a17bda309fde3bdc/follow
        await axios.put(
          "http://localhost:8800/api/users/" + user._id + "/follow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({
          type: "FOLLOW",
          payload: user._id,
        });
      }

      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }

    // setFollowed(!followed);
    // dispatch()
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b> Pola Foster </b> and <b>3 other friends</b> have a birthday
            today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const isFollowed = currentUser.followings.includes(user?._id);
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <AiFillMinusCircle /> : <AiFillPlusSquare />}
          </button>
        )}
        {/* {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {isFollowed ? "Unfollow" : "Follow"}
            {isFollowed ? <AiFillMinusCircle /> : <AiFillPlusSquare />}
          </button>
        )} */}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbar-InfoItem">
            <span className="rightbarInfoKey">Relationship</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noUser.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span
                    className="rightbarFollowingName"
                    style={{ color: "black" }}
                  >
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* <ProfileRightbar /> */}
        {/* <HomeRightbar /> */}

        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
