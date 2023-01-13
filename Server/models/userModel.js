const mongoose = require("mongoose");


const userScemaSignup = new mongoose.Schema({
    username :{
        type: String,
        require : true
    },
    email :{
        type: String,
        require : true,

    },
    password :{
        type: String,
        require : true
    },
    Cpassword :{
        type: String,
        require : true
    }
});

const User = mongoose.model("user",userScemaSignup);
module.exports = User;