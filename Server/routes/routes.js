const express = require("express");
require("dotenv").config();
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/userModel')
const Book = require('../models/bookModel')



router.get('/books', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.SC_KEY);
    console.log(verifyToken);
    if (verifyToken) {
      console.log(verifyToken);
      const userDetail = await User.find({ email: verifyToken });
     

      if (userDetail.length) {
        const propertyData = await Book.find();
        res.status(200).send({ property: propertyData, userData: userDetail });
        console.log(userDetail);
      } else {
        res.status(409).send("Unauthorized user");
      }
      console.log(userDetail);
    } else {
      res.status(409).send("Unauthorized user");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
    console.log(err);
  }
});


module.exports = router;