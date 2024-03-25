const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user");
const app = express();
const session = require("express-session");

const loginRoutes = require("./router/login");
const hotelRoutes = require("./router/hotel");
const adminRoutes = require("./router/admin");
app.use(cors());
const port = 5000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.userId) {
    return next(); // Không có người dùng, chuyển đến middleware tiếp theo
  }
  console.log(req.session);
  User.findById(req.session.user.userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use(loginRoutes);
app.use(hotelRoutes);
app.use(adminRoutes);
//R7iLSQw82qUFqdkk
mongoose
  .connect(
    "mongodb+srv://thangfx21518:R7iLSQw82qUFqdkk@cluster0.fdehoqk.mongodb.net/booking?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, function () {
      console.log(`Server listening on ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
