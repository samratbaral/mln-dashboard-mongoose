const path = require("path");
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const adminController = require("../Controllers/admin");
const isAuth = require("../Middleware/is-auth");

//we send this to flask
router.post(
  "/add-admin",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddAdmin
);

router.get("/admins", adminController.getAdmins);

router.post("/add-admin", adminController.postAddAdmin);

router.get("/edit-admin/:adminID", adminController.getEditAdmin);

router.post(
  "/edit-admin",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddAdmin
);

router.post("/delete-admin", adminController.postDeleteAdmin);

module.exports = router;
