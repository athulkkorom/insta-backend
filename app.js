
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

require("./Models/Post");
require("./Models/User");
require("./Models/follow");
require("./Models/like");
require("./Models/comment");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
app.use('/', require('./routers'));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/INSTA-BACKEND');
  console.log("DB connected");
}

main().catch(err => console.log(err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running${port}`);
});
