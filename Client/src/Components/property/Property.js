import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import Header from "../Header/Header";
import "./Property.css";


const Property = () => {
  // const [value, setValue] = useState("");
  // const [show,setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  let navigate = useNavigate();

  useEffect(() => {
    const afterLogin = () => {
      axios({
        method: "get",
        url: "https://library-management-5wwh.onrender.com/books",
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          setUsers(res.data.property);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    };

    afterLogin();
  }, [token, navigate]);

  const handleImgClick =(id)=>{
    
   localStorage.setItem("Id",id);
    navigate("/bookdetails");
  }

  return (
    <>
      <Header />
      <div className="head">
        <div className="headerContainer">
          <h1>Book Lists</h1>
          <Link to="/Addnewbook">
            {" "}
            <button className="btn_add">
              <span className="text_btn">Add new book</span>
            </button>{" "}
          </Link>
        </div>

        <div className="imageContainer">
          {[...users].map((user, i) => {
        return (
         <div className="images" key={i}>
            <img
              id="image"
              src="https://files.tablegroup.com/wp-content/uploads/2020/12/20223747/themotivebook.png"
              alt=""
              onClick={() => handleImgClick(user._id)}
             
            />
           
            <h3 style={{ color: "blue" }}>{user.title}</h3>
            <h4 style={{ color: "grey" }}>{user.auther}</h4>
            <h4 style={{ color: "white" }}>{user.description}</h4>
          </div>
        );
      })}
          
        </div>
      </div>
    </>
  );
};

export default Property;
