const path = require("path");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");
const errorController = require("./Controllers/error");
const User = require("./Models/user");
const makeDir = require("make-dir");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
// const mongoConnect = require('./Utilities/database').mongoConnect;
const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Data().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "uploads/config" ||
    file.mimetype === "uploads/py" ||
    file.mimetype === "uploads/gen"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("Views", "views");

const adminRoutes = require("./Routes/admin");
const mlnRoutes = require("./Routes/mln-home");
const authRoutes = require("./Routes/auth");
const { query } = require("express");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: filestorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "Public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false, // if true, session will be saved on every request
    saveUninitialized: false,
    store: store,
    cookie: {
      expires: 5 * 60 * 1000,
    }
  })
);
app.use(csrfProtection);
app.use(flash());

//redirects when session expires


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      // session expires in 5 minutes and logs out
      req.session.cookie.maxAge = 5 * 60 * 1000;
      //redirects to login page when session expires
      if (req.session.cookie.expires < new Date()) {
        res.redirect("/login");
      }
      console.log("Session expires in 5 minutes");
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(mlnRoutes);
app.use(authRoutes);

app.use(errorController.get404);
app.use("/500", errorController.get500);

app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log(
      "Connected to MongoDB - Default http://localhost:3000/homepage"
    );
  })
  .catch((err) => {
    console.log(err);
  });
