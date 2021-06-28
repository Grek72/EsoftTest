import "./closeFriend.css";
import { Link } from "react-router-dom";

export default function CloseFriend({ userList}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    userList.map(({userId,username, profilePicture})=>
    <Link to={"/profile/" + username}
    style={{ textDecoration: "none" }}>
     <li key={userId} className="sidebarFriend">
      <img className="sidebarFriendImg" src={                
                    profilePicture
                  ? PF + profilePicture
                  : PF + "person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{username}</span>
    </li>
    </Link>
    )
  );
}