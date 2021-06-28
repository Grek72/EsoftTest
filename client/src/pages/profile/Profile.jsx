import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState,} from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userList, setUserList] = useState([])
  const [user, setUser] = useState({});
  const username = useParams().username;
  // const [file, setFile] = useState(null)
  // const coverPicture = useRef();
  // const userId = useRef(onChange={(e)=>setFile(e.target.files[0]), {onClickHandler}} )

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  // const onClickHandler = (e) => {
  //   e.preventDefault()
  //   const cover = {
  //     userId: userId.current.value,
  //     coverPicture: coverPicture.current.value,
  //   }

  //   try {
  //    const picture = axios.put("/users/:id", cover)
  //   }catch(err){

  //   }
  // }


 

useEffect(()=>{
  const getUsers = async ()=>{
    try {
      const userList = await axios.get("/users/userList/")
      setUserList(userList.data)
      console.log(userList)
    
    } catch (err) {
      
    }
  }
  getUsers()
},[username])




  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar userList={userList}/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label>
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" />
              </label>
              <label htmlFor="file" >             
               <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" /> 
              </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}