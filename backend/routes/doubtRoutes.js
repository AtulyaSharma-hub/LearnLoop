const express = require("express");
const upload = require("../middleware/upload");
const {
  createDoubt,
  getDoubts,
  clearDoubt,
  resolveDoubt,
  getResolvedDoubts
} = require("../controllers/doubtController");

const router = express.Router();

router.post("/", createDoubt);

router.get("/", getDoubts);

router.put(
  "/clear/:id",
  upload.single("file"),
  clearDoubt
);

router.put(
  "/resolve/:id",
  resolveDoubt
);

router.get(
  "/resolved",
  getResolvedDoubts
);

module.exports = router;