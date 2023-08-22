const mongoose = require("mongoose");
const { validationalResult } = require("express-validator");

const fileHelper = require("../Utilities/file");
const GenFiles = require("../Models/generation");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-admin", {
    pageTitle: "Add Product",
    path: "/admin/add-admin",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddAdmin = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  if (!image) {
    return res.status(422).render("admin/edit-admin", {
      pageTitle: "Add Product",
      path: "/admin/add-admin",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
      },
      errorMessage: "Attached file is not an image.",
      validationErrors: [],
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-admin", {
      pageTitle: "Add Product",
      path: "/admin/add-admin",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const imageUrl = image.path;

  const product = new GenFiles({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/admins");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditAdmin = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const adminID = req.params.adminID;
  GenFiles.findById(adminID)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-admin", {
        pageTitle: "Edit Product",
        path: "/admin/edit-admin",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const adminID = req.body.adminID;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  GenFiles.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/admins");
    })
    .catch((err) => console.log(err));
};

exports.getAdmins = (req, res, next) => {
  GenFiles.find({}, (err, docs) => {
    res.status(200).json(docs);
  })
    .then((admins) => {
      console.log(admins);
      res.render("admin/admins", {
        prods: admins,
        pageTitle: "Admin Products",
        path: "/admin/admins",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAdmin = (req, res, next) => {
  const adminID = req.body.adminID;
  GenFiles.findByIdAndRemove(adminID)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/admins");
    })
    .catch((err) => console.log(err));
};
