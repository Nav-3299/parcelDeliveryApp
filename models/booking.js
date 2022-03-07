const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Booking = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    Length: {
        type: String,
        required: true,
    },
 Breadth: {
        type: String,
        required: true,
    },
    Weight: {
        type: String,
        required: true,
    },

   ServiceType: {
        type: String,
        // required: true,
    },
    Pickupadd: {
        type: String,
        // required: true,
    },

    Dropadd: {
        type: String,
        // required: true,
    },

    phone: Number,
});

// Booking.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });

// //generate token
// userSchema.methods.generateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     } catch (err) {
//         console.log(err);
//     }
// };

const Book = mongoose.model("UserBookings", Booking);
module.exports = Book;