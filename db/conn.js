const mongoose = require("mongoose");

const DB =
"mongodb+srv://NAVPREET:navpreet@cluster0.wjwmm.mongodb.net/NavDB?retryWrites=true&w=majority"
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  }
);