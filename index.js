const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors');
var bcrypt = require('bcryptjs');
const fs = require('fs');
// const mysql2 = require('mysql2');

const { rootCertificates } = require('tls');
const mongoose = require('mongoose');
var User = require('./models/userSchema');
var Booking = require('./models/booking');
var Feedback = require('./models/feedback');
app.use(cors());

require('./db/conn');
app.use(bodyparser.json());

app.get('/', function (req, res) {
  res.send("hello");
});

app.get('/login', function (req, res) {
  res.send("hello login");
});
app.post("/register", async function (req, res) {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    return res.status(422).json({ error: "all fields required" });
  }
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      return res.status(422).json({ error: "user Exist" });
    }
    const user = new User({ username, email, phone, password });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({ message: "registered succesfully" });
    } else {
      return res.status(500).json({ error: "please try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

// app.post("/login", async function (req, res) {
//   console.log("Inside login Api");
//   var {email,password}=req.body;
//   console.log(req);
//   // const findResult= User.find((err, docs) => {
//   //       if(!err)
//   //       {
//   //           res.send(docs);
//   //       }
//   //       else
//   //       {
//   //           console.log('Error in retrieving user information!')
//   //       }
//   //   });
//   // await findResult.forEach(console.dir);
  
//   module.exports.User = (req, res, next) =>{
//     User.find({ email: req.body.email},
//         (err, order) => {
//             if (!order)
//                 return res.status(404).json({ status: false, message: 'No orders found!.' });
//             else
//                 return res.status(200).json({ status: true, order});
//         }
//     );
// }
//   // var findResult = User.findOne({ email:req.body.email });
//   // console.log(findResult);
//   // if (findResult){
//   //   res.send("1");

//   // console.log(findResult);
// //   }
// //   else{
// //     res.send("0");
// //   }
//   });


app.post("/parcel", function (req, res) {
  let date_ob = new Date();

  var { email, Length, Breadth, Weight, Pickupadd, Dropadd, phone, serviceType } = req.body;
  const filename = email + ".txt";
  var data = "\n\n\n\nDATE=" + date_ob + "\nEmail=" + email + "\nLength=" + Length + "\nBreadth" + Breadth + "\nWeight" + Weight +"\nPickupadd="+ Pickupadd+"\n Dropadd ="+ req.body.Dropadd +"\nphone="+ phone+"\nserviceType=" +serviceType;

  fs.appendFile(filename, data, (err) => {
    console.log("file has been created");
    res.send("Hey");
  });
  console.log("made");
});


app.post("/viewHistory",function(req,res){
  var { email}=req.body;
  const filename=email+".txt";
   (fs.readFile(filename,"utf-8",(err,data)=>{
    console.log(data);
    res.send(data+"\n");
    // str=data;
  }));
  // console.log("^"+str);
  // res.send('<p>hello p</p>');
})

app.post("/feedback",function(req,res){
  let date_ob = new Date();

  var { email, feedback } = req.body;
  const filename = email + "_feed.txt";
  var data = "\n\n\n\nDATE=" + date_ob + "\nEmail=" + email + "\nFeedback=" + feedback ;

  fs.appendFile(filename, data, (err) => {
    // console.log("file has been created");
    res.send("Hey2");
  });
  console.log("Thanks");
})

app.post("/otp",function(req,res){
  const accountSid = 'ACa502eba657637f0b823c89dd26648b0e'; 
  const authToken = 'd6a712008190bb9937ae4d4b4a53b344'; 
  const client = require('twilio')(accountSid, authToken); 
   const code=712398;
  client.messages 
        .create({ 
          
           body: 'OTP is '+code,  
           messagingServiceSid: 'MG66047bd3c21583b5f5a0856e208ec147',      
           to: '+917307039393' 
         }) 
        .then(message => console.log(message)) 
        .done();
});

//  app.post("/login", async function(req, res) {
// //   // console.log("hello world");

//   const { username, password } = req.body;
// //   // console.log(username,password);
// //   // username=JSON.stringify(username);
// //   // console.log(username,password);

// //   // return;
//   if (!username || !password) {
//     return res.status(422).json({ error: "all fields required" });
//   }

//   try {
//     const userLogin = await User.findOne({ username: username });
//     if (userLogin) {
//       // check password
//       const matchPass = await bcrypt.compare(password, userLogin.password);

//       //set json web-token
//       // let token = await userLogin.generateAuthToken();

//       // console.log("Token: ", token);
//       // res.cookie("token", token, {
//         // expires: new Date(Date.now() + 2589000000),
//         // httpOnly: true,
//       // });

//       if (!matchPass) {
//         res.status(400).json({ message: "wrong credential" });
//       } else {
//         res.json({ message: `${userLogin.username} logged-in succesfully` });
//         console.log(userLogin.name);
//       }
//     } else {
//       return res.status(427).json({ error: "please try again" });
//     }
//   } catch (err) {
//     console.log(err);
//   }

// //     // user.find((err, docs) => {
// //     //     if(!err)
// //     //     {
// //     //         res.send(docs);
// //     //     }
// //     //     else
// //     //     {
// //     //         console.log('Error in retrieving user information!')
// //     //     }
// //     // });
//  });
// app.use("/register");


app.listen(3000, () => {
  console.log("Service Running");
})