const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 const bodyParser=require('body-parser');
//--form task---
//  const logger =require(morgan);
 const v1  =require('./routes/api/v1')






require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routers
 app.use('/api/v1',require('./routes/api/v1'));

app.get('/test',(req,res)=>{
  res.send('Hi');
});




app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
