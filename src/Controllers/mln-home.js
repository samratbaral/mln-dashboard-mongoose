const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const http = require("http");
const express = require("express");
const request = require("request");
const { validationResult } = require("express-validator");
const { readdir } = require("fs").promises;

const bison = require("bison");
const encode = bison.encode;
const decode = bison.decode;

const User = require("../Models/user");
const GenFiles = require("../Models/generation");
const Order = require("../Models/analysis");
const { type } = require("os");
const response = require("express");
//const Backup = require('../Models/backup');
//Backup.fetchAll()
//documentation: https://mongoosejs.com

exports.getMln = (req, res, next) => {
  console.log("MLN [GET]");
  res.render("research/mln", {
    pageTitle: "MLN",
    path: "/mln",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getMlnHome = (req, res, next) => {
  console.log("MLN Home [GET]");
  const { username } = req.query;
  console.log(username);
  res.render("research/mln-home", {
    pageTitle: "MLN Home",
    path: "/mln-home",
    isAuthenticated: req.session.isLoggedIn,
    username,
  });
};

exports.postMlnHome = (req, res, next) => {
  console.log("MLN Home [POST]");
  res.render("research/mln-home", {
    pageTitle: "MLN Home",
    path: "/mln-home",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getViewFile = (req, res, next) => {
  console.log("View [GET]");
  const rootpath = process.env.APP_USER_DIRECTORY;
  const { username } = req.query;
  const userpath = path.join(rootpath, username);
  console.log("User Path: " + userpath);

  const walk = async (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach((file) => {
        file = path.resolve(dir, file);
        fs.stat(file, (err, stat) => {
          if (stat && stat.isDirectory()) {
            walk(file, (err, res) => {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };

  walk(userpath, (err, results) => {
    if (err) throw err;
    // console.log(results);
    //LOOP THROUGH RESULTS AND GET THE FILE NAMES
    let fileNames = [];
    for (let i = 0; i < results.length; i++) {
      let fileName = results[i].split("\\");
      fileNames.push(fileName);

      console.log("FILENAME"+fileName);
      // console.log("FILENAME[i]"+fileName[fileName.length - 1]);
      
      fileNames.push(fileName[fileName.length - 1]);
      // fs.readdirSync(fileName[i-1],"utf-8", (err, files) => {
      //   if (err) throw err;
      //   console.log(files);
      // });
      fs.readFile(results[i], "utf8", (err, data) => {
        if (err) throw err;
        // console.log(data);
      }
      );

    }
    res.render("research/viewfile", {
      pageTitle: "View File",
      path: "/viewfile?=",
      isAuthenticated: req.session.isLoggedIn,
      files: fs.readdirSync(userpath),
      directory: userpath,
      username,
      userpath,
      results,
    });
  });
};






// res.render("research/viewfile", {
//     path: "/viewfile?username=" + username,
//     pageTitle: "View File",
//     isAuthenticated: req.session.isLoggedIn,
//     // files: fs.readdirSync(__dirname, "utf8"),
//     // directory: __dirname,

//     files: fs.readdirSync(userpath),
//     directory: userpath,
//     username,
//     userpath,
//   });


  
// };

exports.postViewFile = (req, res, next) => {
  console.log("View [POST]");
};

exports.getViewFileContent = (req, res, next) => {
  console.log("View [GET]");
  const { selectedFile } = req.query;
  const { directory } = req.query;
  const { userpath } = req.query;
  const { username } = req.query;
  console.log(username);
  let data = fs.readFileSync(path.join(directory, selectedFile), "utf8");
  let lines = data.split(/\r?\n/);
  res.render("research/viewfilecontent", {
    path: "/viewfilecontent",
    pageTitle: "View File Content",
    files: fs.readdirSync(userpath),
    lines,
    directory,
    userpath,
    username,
  });
};

exports.postViewFileContent = (req, res, next) => {
  console.log("View File Content [POST]");
};

exports.getChangeDirectory = (req, res, next) => {
  console.log("Change Directory [GET]");
  const { selectedFolder } = req.query;
  const { directory } = req.query;
  const { userpath } = req.query;
  res.render("research/cd", {
    path: "/cd",
    pageTitle: "Change Directory",
    files: fs.readdirSync(path.join(directory, selectedFolder)),
    selectedFolder,
    directory: path.join(directory, selectedFolder),
    userpath,
  });
};

exports.postChangeDirectory = (req, res, next) => {
  console.log("Change Directory [POST]");
};

exports.getChangeDirectoryFileContent = (req, res, next) => {
  console.log("Change Directory File Content [GET]");
  const { selectedFile } = req.query;
  const { directory } = req.query;
  const { userpath } = req.query;
  const { username } = req.query;
  let data = fs.readFileSync(path.join(directory, selectedFile), "utf8");
  let lines = data.split(/\r?\n/);
  res.render("research/viewfilecontent", {
    path: "/viewfilecontent",
    pageTitle: "Change Directory File Content",
    files: fs.readdirSync(directory),
    lines,
    directory,
    userpath,
    username,
  });
};

exports.postChangeDirectoryFileContent = (req, res, next) => {
  console.log("Change Directory File Content [POST]");
};

exports.getUserDirectoryFile = (req, res, next) => {
  console.log("User Directory [GET]");
  const rootpath = process.env.APP_USER_DIRECTORY;
  const { username } = req.query;
  const userpath = path.join(rootpath, username);
  console.log(userpath);
  res.render("research/user-directory", {
    path: "/user-directory?username=" + username,
    pageTitle: "User Directory",
    isAuthenticated: req.session.isLoggedIn,
    // files: fs.readdirSync(__dirname, "utf8"),
    // directory: __dirname,
    files: fs.readdirSync(userpath),
    directory: userpath,
    username,
    userpath,
  });
};

exports.postUserDirectoryFile = (req, res, next) => {
  console.log("User Directory [POST]");
};

exports.getGenerationFile = (req, res, next) => {
  console.log("Generation [GET]");
  const rootpath = process.env.APP_USER_DIRECTORY;
  const { username } = req.query;
  const userpath = path.join(rootpath, username);
  console.log(userpath);
  res.render("research/generation", {
    path: "/generation?username=",
    pageTitle: "Generation",
    isAuthenticated: req.session.isLoggedIn,
    // files: fs.readdirSync(__dirname, "utf8"),
    // directory: __dirname,
    files: fs.readdirSync(userpath),
    directory: userpath,
    username,
    userpath,
  });
};

exports.postGenerationFile = (req, res, next) => {
  console.log("Generation [POST]");
  // const name = req.body.name;
  // const email = req.body.email;
  // const phone = req.body.phone;
  // const file = req.body.file;
  // const generation = new GenFiles({
  //   name: name,
  //   email: email,
  //   phone: phone,
  //   file: file,
  // });
  // generation
  //   .save()
  //   .then((result) => {
  //     console.log("Created Order");
  //     res.redirect("/generation");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getAnalysisFile = (req, res, next) => {
  console.log("Analysis [GET]");
  const rootpath = process.env.APP_USER_DIRECTORY;
  const { username } = req.query;
  const userpath = path.join(rootpath, username);
  console.log(userpath);
  res.render("research/analysis", {
    path: "/analysis",
    pageTitle: "Analysis",
    isAuthenticated: req.session.isLoggedIn,
    // files: fs.readdirSync(__dirname, "utf8"),
    // directory: __dirname,
    files: fs.readdirSync(userpath),
    directory: userpath,
    username,
    userpath,
  });
};

exports.postAnalysisFile = (req, res, next) => {
  console.log("Analysis [POST]");
  // const name = req.body.name;
  // const email = req.body.email;
  // const phone = req.body.phone;
  // const file = req.body.file;
  // const analysis = new Order({
  //   name: name,
  //   email: email,
  //   phone: phone,
  //   file: file,
  // });
  // analysis
  //   .save()
  //   .then((result) => {
  //     console.log("Created Order");
  //     res.redirect("/analysis");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getVisualizationFile = (req, res, next) => {
  console.log("Visualization [GET]");
  const rootpath = process.env.APP_USER_DIRECTORY;
  const { username } = req.query;
  const userpath = path.join(rootpath, username);
  res.render("research/visualization", {
    path: "/visualization",
    pageTitle: "Visualization",
    isAuthenticated: req.session.isLoggedIn,
    // files: fs.readdirSync(__dirname, "utf8"),
    // directory: __dirname,
    files: fs.readdirSync(userpath),
    directory: userpath,
    username,
    userpath,
  });
};

exports.postVisualizationFile = (req, res, next) => {
  console.log("Visualization [POST]");
  // const name = req.body.name;
  // const email = req.body.email;
  // const phone = req.body.phone;
  // const file = req.body.file;
  // const visualization = new GenFiles({
  //   name: name,
  //   email: email,
  //   phone: phone,
  //   file: file,
  // });
  // visualization
  //   .save()
  //   .then((result) => {
  //     console.log("Created Order");
  //     res.redirect("/visualization");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
