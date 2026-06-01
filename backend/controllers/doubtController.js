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

    const doubts = await Doubt.find({
  resolved: false
}).sort({
    createdAt: -1
  });

    res.json(doubts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const clearDoubt =
async (req, res) => {

  try {

    const doubt =
      await Doubt.findById(
        req.params.id
      );

    if (!doubt) {

      return res.status(404).json({
        message: "Doubt not found"
      });

    }

    const responseType =
      req.body.responseType ||
      req.body.helpType ||
      "text";

    doubt.resolved = true;
    doubt.responseType = responseType;
    doubt.helpType = responseType;

    if (responseType === "text") {

      const text =
        req.body.responseContent ||
        req.body.textHelp ||
        "";

      doubt.responseContent = text;
      doubt.helpContent = text;

    } else if (req.file) {

      const folder =
        responseType === "image" ? "images" : "videos";
      const relativePath = `${folder}/${req.file.filename}`;

      doubt.responseContent = relativePath;
      doubt.helpContent = relativePath;

    }

    doubt.resolvedAt = new Date();

    await doubt.save();

    res.json(doubt);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


const resolveDoubt = async (req, res) => {

  try {

    const doubt =
      await Doubt.findById(req.params.id);

    if (!doubt) {

      return res.status(404).json({
        message: "Doubt not found"
      });

    }

    if (!req.body.teacherResponse?.trim()) {

      return res.status(400).json({
        message: "Response is required"
      });

    }

    const text = req.body.teacherResponse.trim();

    doubt.resolved = true;
    doubt.responseType = "text";
    doubt.helpType = "text";
    doubt.responseContent = text;
    doubt.helpContent = text;
    doubt.resolvedAt = new Date();

    await doubt.save();

    res.json(doubt);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getResolvedDoubts =
async (req, res) => {

  try {

    const doubts =
      await Doubt.find({
        resolved: true
      }).sort({
        resolvedAt: -1
      });

    res.json(doubts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createDoubt,
  getDoubts,
  clearDoubt,
  resolveDoubt,
  getResolvedDoubts
};