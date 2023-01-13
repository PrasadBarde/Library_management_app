const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/signin", (req, res) => {
  User.find({ email: req.body.email })
    .then((data) => {
      if (!data.length) {
        res.status(400).send("User doesn't exists!");
      } else {
        bcrypt.compare(req.body.password, data[0].password).then((result) => {
          if (result) {
            const authToken = jwt.sign(data[0].email, process.env.SC_KEY);
            res.status(200).send({ authToken });
          } else {
            res.status(400).send("Incorrect password");
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/signup", async (req, res) => {
  await User.find({ email: req.body.email }).then((data) => {
    if (data.length) {
      return res.status(400).send("User already exists please signIn!");
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        Cpassword: req.body.Cpassword,
      });
      bcrypt
        .hash(req.body.password, saltRounds)
        .then((hash) => {
          // Store hash in your password DB.
          newUser.password = hash;
          newUser.Cpassword = hash;
          newUser
            .save()
            .then((data) => {
              return res.status(200).send(data);
            })
            .catch((err) => {
              return res.status(403).send(err);
            });
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    }
  });
});

module.exports = router;
