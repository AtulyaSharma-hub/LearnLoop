const express = require("express");

const {
  createDoubt,
  getDoubts,
  clearDoubt
} = require("../controllers/doubtController");

const router = express.Router();

router.post("/", createDoubt);

router.get("/", getDoubts);

router.delete("/:id", clearDoubt);

module.exports = router;