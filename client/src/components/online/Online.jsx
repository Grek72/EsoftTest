


import "./online.css";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Online({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
    useEffect(() => {
      const getFriends = async () => {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
      };
  
      getFriends();
    }, [currentId]);
  
    useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);
  
    const handleClick = async (user) => {
      try {
        let res = await axios.get(
          `/conversations/find/${currentId}/${user._id}`
        );
        if (!res) {
          res = await axios.post(
            `/conversations/create/${currentId}/${user._id}`
          );
        }
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <div className="rightbarFriend">
            {onlineFriends.map((o)=> (
            <div className="rightbarProfileImgContainer" onClick={() => handleClick(o)}>
                <img className="rightbarProfileImg" 
                              src={
                                o?.profilePicture
                                  ? PF + o.profilePicture
                                  : PF + "person/noAvatar.png"
                              }
                              alt=""
                              />
                <span className="rightbarOnline">{o?.username}</span>
            </div>
            ))}
        </div>

    )
}