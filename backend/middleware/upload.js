const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    let dest;

    if (file.mimetype.startsWith("image")) {
      dest = path.join("uploads", "images");
    } else if (file.mimetype.startsWith("video")) {
      dest = path.join("uploads", "videos");
    } else {
      return cb(new Error("Unsupported file type"));
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
    } catch (err) {
      return cb(err);
    }

    cb(null, dest);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;