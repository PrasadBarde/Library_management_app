const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import routes
const authRoute=require('./routes/auth')
const listRoute=require('./routes/routes')
const postRoute=require('./routes/postRoute')

app.use(express.json());
app.use("/",authRoute)
app.use("/",listRoute)
app.use("/",postRoute)


module.exports=app