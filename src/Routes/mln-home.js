const path = require("path");
const express = require("express");
const request = require("request");
const router = express.Router();
const User = require("../Models/user");

const mlnDashController = require("../Controllers/mln-home");
const isAuth = require("../Middleware/is-auth");

router.get("/", mlnDashController.getMln);
router.get("/", mlnDashController.getMln);

router.get("/mln-home", mlnDashController.getMlnHome);
router.post("/mln-home", mlnDashController.postMlnHome);

router.get("/viewfile", mlnDashController.getViewFile);
router.post("/viewfile", mlnDashController.postViewFile);

router.get("/viewfilecontent", mlnDashController.getViewFileContent);
router.post("/viewfilecontent", mlnDashController.postViewFileContent);

router.get("/cd", mlnDashController.getChangeDirectory);
router.post("/cd", mlnDashController.postChangeDirectory);

router.get("/cdfilecontent", mlnDashController.getChangeDirectoryFileContent);
router.post("/cdfilecontent", mlnDashController.postChangeDirectoryFileContent);

router.get("/user-directory", mlnDashController.getUserDirectoryFile);
router.post("/user-directory", mlnDashController.postUserDirectoryFile);

router.get("/generation", mlnDashController.getGenerationFile);
router.post("/generation", mlnDashController.postGenerationFile);

router.get("/analysis", mlnDashController.getAnalysisFile);
router.post("/analysis", mlnDashController.postAnalysisFile);

router.get("/visualization", mlnDashController.getVisualizationFile);
router.post("/visualization", mlnDashController.postVisualizationFile);

module.exports = router;
