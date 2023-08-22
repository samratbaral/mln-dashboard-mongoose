const crypto = require("crypto");
const Ismail = require("isemail");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const validator = require("email-validator");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const mkdir = require("fs");
const { error } = require("console");
const fs = require("fs");
const fse = require("fs-extra");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const makeDir = require("make-dir");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    sucessMessage: message,
    oldInput: {
      username: "",
      password: "",
    },
    validationErrors: [],
  });
};
exports.getHomepage = (req, res, next) => {
  res.render("auth/homepage", {
    path: "/homepage",
    pageTitle: "Homepage",
  });
};
exports.postHomepage = (req, res, next) => {
  res.render("auth/homepage", {
    path: "/homepage",
    pageTitle: "Homepage",
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("ERROR!");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    sucessMessage: message,
    oldInput: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "0000000000",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
    req.flash("error", "Username Not Found. Try Again!");
  }
  res
    .render("auth/reset", {
      path: "/reset",
      pageTitle: "Reset Password",
      errorMessage: message,
      sucessMessage: message,
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        sucessMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDeleteUser = (req, res, next) => {
  let message = req.flash("error", "Username Not Found. Try Again!");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/delete-user", {
    path: "/delete-user",
    pageTitle: "Delete User",
    errorMessage: message,
    sucessMessage: message,
    oldInput: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      sucessMessage: errors.array()[0].msg,
      oldInput: {
        username: username,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Username isn't register, please register first.",
          sucessMessage: "Welcome User to MLN Dashboard.",
          oldInput: {
            username: username,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (!doMatch) {
            custom((value, { req }) => {
              if (value !== req.body.password) {
                throw new Error(
                  "Passwords have to match, please recheck again!"
                );
              }
              return true;
            });
            return Promise.reject("Invalid Password, please try again!.");
          }
          if (password === null && doMatch === null) {
            return Promise.resolve("Password is empty, please try again!.");
          }
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/viewfile?username=" + user.username);
            });
          } else {
            return res.status(422).render("auth/login", {
              path: "/login",
              pageTitle: "Login",
              errorMessage: "Invalid Password, please try again!.",
              oldInput: {
                username: username,
                password: password,
              },
              validationErrors: [],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      sucessMessage: errors.array()[0].msg,
      oldInput: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      fs.mkdirSync(username);
      console.log(process.env.APP_USER_DIRECTORY);
      console.log(typeof process.env.APP_USER_DIRECTORY);
      console.log(typeof username);
      const dir = process.env.APP_USER_DIRECTORY + username;
      fs.mkdirSync(dir);
      res.redirect("/login");
      //TODO:: Mailing for new user.
      console.log("CREATE USER - [SUCESS]");
      console.log("[TODO]: Mailing for new user.");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/login");
        //transporter.sendMail({
        // to: req.body.email,
        // from: 'shop@node-complete.com',
        // subject: 'Password reset',
        // html: `
        //     <p>You requested a password reset</p>
        //     <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        // `
        //});
        //TODO::Set Verification to Reset the Password - Hacking Vulnerable
        console.log(
          "TODO::Set Verification to Reset the Password - Hacking Vulnerable"
        );
        console.log("Follow the link to reset");
        console.log("http://localhost:3000/reset/${token}");
        console.log("New Password Reset!");
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/delete-user", {
      path: "/delete-user",
      pageTitle: "Delete User",
      errorMessage: errors.array()[0].msg,
      sucessMessage: errors.array()[0].msg,
      oldInput: {
        username: username,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/delete-user", {
          path: "/delete-user",
          pageTitle: "Delete User",
          errorMessage: "Invalid Username or Password.",
          sucessMessage: "Sucess, User is Removed ",
          oldInput: {
            username: username,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            return user
              .delete()
              .then(() => {
                console.log("DELETE USER - [SUCESS]");
                req.session.destroy((err) => {
                  console.log(err);
                  res.redirect("/login");
                });
              })
              .catch((err) => {
                console.log(err);
                res.redirect("/delete-user");
              });
          }
        })
        .catch((err) => {
          console.log(err);
          //deleteUser.delete();
          fse.rmdirSync("../MLN-Home/User/" + username);
          res.redirect("/logout");
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/homepage");
  });
};

// top part
// validator.validate("test@email.com");
// > var Isemail = require('isemail');
// undefined
// > Isemail.validate('test@iana.org');
//

// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//     //sendgridTransport({
//         // auth:{
//         //     api_key:
//         //     'ha7yfFPTWTIPOHq916UTqJud3MSeGpYMAF8yszLNhpc4JFgg1esV6nxdrh9YDFp1'
//         //     //api key: mln  // id: 62f486690658670483c8cb99
//         // }
//     //})
//     console.log('[FIX] Need to Set API - Email Confirmation');
// );

///post sigup
//TODO: https://www.section.io/engineering-education/password-strength-checker-javascript/

// User.findOne({ username: username })
// .then(userDoc => {
//     if (userDoc) {
//         req.flash('error','Username exists already, please pick a different one.');
//         return res.redirect('/signup');
//     }
//     if(!validator.validate(email)){
//             // req.flash('error', 'Invalid');
//             return res.redirect('/signup');
//             }
// if(!validator.validate(email)){
// if(!username){
// req.flash('error', 'Username is Invalid.');
// return res.redirect('/login');
// }
