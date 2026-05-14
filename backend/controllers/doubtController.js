const Doubt = require("../models/Doubt");

const createDoubt = async (req, res) => {

  try {

    const doubt =
      await Doubt.create(req.body);

    res.status(201).json(doubt);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getDoubts = async (req, res) => {

  try {

    const doubts =
      await Doubt.find();

    res.json(doubts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const clearDoubt = async (req, res) => {

  try {

    await Doubt.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Doubt Cleared"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createDoubt,
  getDoubts,
  clearDoubt
};