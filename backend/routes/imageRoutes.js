const express = require("express");
const multer = require("multer");

const {
  uploadImage
} = require("../controllers/imageController");

const router = express.Router();

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "uploads/"
    );

  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );

  }

});

const upload =
  multer({ storage });

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

module.exports = router;