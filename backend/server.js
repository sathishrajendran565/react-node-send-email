const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

// Static folder
//app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "your email here",
    pass: "your email password here",
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/access", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;
  var name = "testname";
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: "sathishrajendran",
    to: "sathishrajendranakasatz@gmail.com",
    message: "test message!",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
        error: JSON.stringify(err),
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => console.info(`server has started on ${PORT}`));
