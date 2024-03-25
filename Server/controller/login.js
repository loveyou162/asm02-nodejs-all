const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.postLogin = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.json({ message: "Cannot find user!" });
      }
      console.log(12, user);
      if (!req.body.password) {
        return res.json({ message: "Password is required!" });
      }
      //dùng bcrypt để so sánh password nhận được với chuỗi pw mã hóa
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            req.session.user = {
              userId: user._id,
              username: user.username,
            };
            console.log("User is logged in!");
            console.log(24, result);
            res.json({
              _id: user._id,
              username: user.username,
              token: true,
              isAdmin: user.isAdmin,
            });
          } else {
            res.json({ message: "Password invalid!" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSignUp = (req, res, next) => {
  const username = req.body.username;
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      //Kiểm tra xem đã tồn tại người dùng với email này chưa
      return User.findOne({ username: username }).then((existingUser) => {
        console.log(43, existingUser);
        if (existingUser) {
          res.json({ message: "Email đã được sử dụng" });
          return;
        } else {
          const user = new User({
            username: username,
            password: hashedPassword,
            isAdmin: false,
          });
          res.json({ message: "Đã tạo người dùng thành công! Hãy đăng nhập." });
          return user.save().then(() => {
            return;
          });
        }
      });
    })
    .catch((err) => console.log(err));
};
exports.postSignUpAdmin = (req, res) => {
  const username = req.body.username;
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      return User.findOne({ username: username }).then((existingUser) => {
        console.log(70, existingUser);
        if (existingUser) {
          res.json({ message: "Email đã được sử dụng!" });
          return;
        } else {
          const user = new User({
            username,
            password: hashedPassword,
            isAdmin: true,
          });
          res.json({ message: "Đã tạo người dùng thành công! Hãy đăng nhập." });
          return user.save().then(() => {
            return;
          });
        }
      });
    })
    .catch((err) => console.log(err));
};
