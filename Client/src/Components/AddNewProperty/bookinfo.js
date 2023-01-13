import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./bookinfo.css";
import Header from "../Header/Header";
import axios from "axios";
import { Cookies } from "react-cookie";


function BookInfo() {
  let navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const [dataSent, setDataSent] = useState(false);

  const [data, setdata] = useState({
    title: "",
        isbn: "",
        auther: "",
        description: "",
        published_date: "",
        publisher: "",
  });
  
  useEffect(() => {
    const sendData = () => {
      axios({
        method: "post",
        url: "https://library-management-5wwh.onrender.com/addnewbook",
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        data: data,
      })
        .then((res) => {
          window.alert("Book details added successfully!");
          console.log(res);
          
        })
        .catch((err) => {
          console.log(err);
          alert("error in adding book details");
        });
    };

    if (dataSent) {
      sendData();
      setDataSent(false);
      navigate("/property");
    }
  }, [data, dataSent,token,navigate]);
  
  const handlesubmit =()=>{
    setDataSent(true)
   
  }
    
 

  return (
    <>
      <Header />
     
      <div className="main_section">
        <div className="heading">
          <h2>ADD BOOK</h2>
        </div>
        <form className="form" onSubmit={handlesubmit}>
        <div className="title">
              <label for="title">Title</label>
              <div>
                <input
                  className="title"
                  required={true}
                  placeholder="Title"
                  onChange={(e) => setdata({ ...data, title: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="email1">
              <label for="isbn">ISBN</label>
              <div>
                <input
                  className="isbn"
                  required={true}
                  placeholder="ISBN"
                  onChange={(e) => setdata({ ...data, isbn: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="auther">
              <label for="auther">AUTHER</label>
              <div>
                <input
                  className="auther"
                  required={true}
                  placeholder="Title"
                  onChange={(e) => setdata({ ...data, auther: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="description">
              <label for="description">Description</label>
              <div>
                <input
                  className="description"
                  required={true}
                  placeholder="Description"
                  onChange={(e) => setdata({ ...data, description: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="email1">
              <label for="published_date">Published_date</label>
              <div>
                <input
                  className="published_date"
                  type={"date"}
                  required={true}
                  placeholder="published_date"
                  onChange={(e) => setdata({ ...data, published_date: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="publisher">
              <label for="publisher">Publisher</label>
              <div>
                <input
                  className="publisher"
                  required={true}
                  placeholder="Publisher"
                  onChange={(e) => setdata({ ...data, publisher: e.target.value })}
                ></input>
              </div>
            </div>
            
            
          <Link to="/property">
            <button >Show Book List</button>
          </Link>
          <button className="save2" type="submit">
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}

export default BookInfo;
