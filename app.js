require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConnect = require('./dbconnect');
const nodemailer = require('nodemailer');
const Users = require('./Model/users');
const port = 5555 || process.env.PORT;

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/contact",express.static('Views'));

// app.post("/contact", (req,res) => {
//     const usr = new Users();
//     usr.email = req.body.email;
//     usr.pwd = req.body.pwd;

//     usr.save((err)=> {
//         if (err) console.log("there seems to be an error in saving");
//         res.json({"data" : "sent"});
//     })
// })

app.post("/email", (req,res)=> {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "passionateminds.in@gmail.com",
            pass: `${process.env.EMAIL_PASS}`
        }
    });
    transporter.sendMail({
        from: '"Khalil Ali" <passionateminds.in@gmail.com>',
        to: `${req.body.email}`,
        subject: 'Test Mail ✔',
        text: 'Hi ...',
        html: `${req.body.text}`
    }).then((info)=>{
        console.log('Message sent: %s', info.messageId);
        res.send({"status" : "successfully sent mail"});
    })
});

app.get("/", (req,res)=> {
    Users.find({}, (err, data)=> {
        if (err) throw err;
        res.send(data);
    })
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

