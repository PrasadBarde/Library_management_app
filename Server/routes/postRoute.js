const express = require("express");
const app = express();

const Book = require("../models/bookModel")

app.post('/addnewbook', async (req, res) => {
    const data = await Book.find()
    let ppid = -1
    if (data.length === 0) ppid = 1
    else ppid = data[data.length - 1]._id + 1
    const newBook = await Book({
        _id: ppid,
        title: req.body.title,
        isbn: req.body.isbn,
        auther: req.body.auther,
        description: req.body.description,
        published_date: req.body.published_date,
        publisher: req.body.publisher,
    })
    newBook.save().then((data) => {
        console.log('Book Added')
        res.json(data);
    }).catch(err => console.log(err.message));
});

//--------------------get specific book information------------------------
app.get("/getbook/:id", async(req,res)=>{
  let id = req.params.id;
  let book;
  try {
     
    book = await Book.findById(id)
    // console.log(users);
  } catch (err) {
    console.log(err);
  }
  if (! book) {
    return res.status(404).json({ message: "No book found" });
  }
  return res.status(200).json({
    message: "succses",
    book,
  });
})



// -------------------Delete a specific book-------------------
app.delete("/deletebook/:id", async(req,res)=>{
    const id = req.params.id;
    let book = await Book.findById(id);
    try {
       await Book.findByIdAndRemove(id,(data)=>{
        return res.status(200).json({
            message: "book deleted succsesfully ",
            book,
          });
       })
    } catch (err) {
      return console.log(err);
    }
    })


//-----------------Edit the details  of a specific book-------------------
app.put("/editbook/:id",async(req,res)=>{
    try {
       console.log(req.body);
     
      const task = await Book.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({
        status: "Success",
        task,
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: err.message,
      });
    }
  })
    
module.exports = app