import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useEffect, useState, } from "react";
import axios from "axios";
import { useParams } from "react-router";



export default function Home() {
  const [userList, setUserList] = useState([])
  const username = useParams().username;



  useEffect(()=>{
    const getUsers = async ()=>{
      try {
        const userList = await axios.get("/users/userList/")
        setUserList(userList.data)
      
      } catch (err) {
        
      }
    }
    getUsers()
  },[username])




  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar userList={userList}/>
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
