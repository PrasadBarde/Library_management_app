import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Cookies } from "react-cookie";
import "./bookDetails.css";

function BookDetails() {
  // console.log(localStorage.getItem("Id"));
  const [book, setBook] = useState({});
  const [deletes,setDeletes] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  let navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://library-management-5wwh.onrender.com/getbook/${localStorage.getItem("Id")}`,
      headers: {
        Accept: "application/json",
        authorization: token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setBook(res.data.book);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
      // eslint-disable-next-line
  }, []);

  
    useEffect(() => {
        const handleDelete = () => {
      axios({
        method: "delete",
        url: `https://library-management-5wwh.onrender.com/deletebook/${localStorage.getItem("Id")}`,
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          //   setBook(res.data.book);
          window.alert(res.data.message);
          navigate("/property")
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    };
    if (deletes){
        handleDelete();
        setDeletes(false);
    }
    // eslint-disable-next-line
    }, [deletes,setDeletes,token]);
  
  return (
    <>
      <Header />
      <div className="topcontainer">
        <h2>BOOK'S RECORDS</h2>
        <p>view books info</p>
        <Link to="/property">
          <button className="cancel" style={{ backgroundColor: "yellow" }}>
            Show Book List
          </button>
        </Link>
      </div>
      <div className="main-container">
        <table>
          <tr>
            <th>Sr</th>
            <th>Sections</th>
            <th>Details</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Auther</td>
            <td>{book.auther}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Description</td>
            <td>{book.description}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Published Date</td>
            <td>{book.published_date}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Publisher</td>
            <td>{book.publisher}</td>
          </tr>
        </table>
        <div className="bottom">
          <button style={{ backgroundColor: "Red" }} onClick={() => setDeletes(true)}>
            Delete Book
          </button>

          <Link to="/editbookdetails">
            <button style={{ backgroundColor: "green" }}>Edit Book</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
