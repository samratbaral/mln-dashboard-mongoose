const express = require("express");
const { check, body } = require("express-validator");
const router = express.Router();

const authController = require("../Controllers/auth");
const User = require("../Models/user");

router.post("/homepage", authController.postHomepage);
router.get("/homepage", authController.getHomepage);

router.get("/login", authController.getLogin);
router.post("/login",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "Username isn't register, please register first."
            );
          }
          if (userDoc == null) {
            return Promise.resolve(
              "Username is empty, please pick a different username."
            );
          }
        });
      }),
    body("password", "Password has to be valid.")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);
router.post("/signup",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Username exits already, please pick a different username."
            );
          }
          if (userDoc == null) {
            return Promise.resolve(
              "Username is empty, please pick a different username."
            );
          }
        });
      }),
    check("email") //change check -> body if not wanna check if exist email exist in some other account.& remove custom search
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Oops looks like your e-mail exists already exist with us."
            );
          }
        });
      }),
    body("phone")
      .isLength({ min: 10 })
      .withMessage("Please enter a valid phone length."),
    // .custom((value, { req }) => {
    //   const tel = "000-000-00000000";
    //   value = tel;
    //   req.body.phone = value;
    //   if (value !== req.body.phone) {
    //     throw new Error("entered ###-###-#### 10 phone numbers");
    //   }
    //   return true;
    //   // else if (value) {
    //   //   return Promise.resolve(
    //   //     "automatically enter 000-000-0000 10 phone numbers added."
    //   //   );
    //   // } else {
    //   //   return Promise.reject(
    //   //     "Please enter ###-###-#### 10 phone numbers only."
    //   //   );
    //   // }
    // })
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match, please recheck again!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get("/delete-user", authController.getDeleteUser);
router.post("/delete-user",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "Username do not exits, please retry username."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postDeleteUser
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

router.post("/logout", authController.postLogout);
module.exports = router;
