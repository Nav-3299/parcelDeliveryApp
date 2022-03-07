const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const feedback = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
 
});


 

const Feedback = mongoose.model("UserFeedbacks", feedback);
module.exports = Feedback;