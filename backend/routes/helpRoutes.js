const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const Doubt = require("../models/Doubt");
const User = require("../models/User");

router.post(

  "/:id",

  upload.single("file"),

  async (req, res) => {

    try {

      const {
        helpType,
        textHelp,
        mentorName
      } = req.body;

      let helpContent = "";
      let responseContent = "";

      if (helpType === "text") {

        helpContent = textHelp || req.body.responseContent || "";
        responseContent = helpContent;

      } else if (req.file) {

        const folder =
          helpType === "image" ? "images" : "videos";
        const relativePath = `${folder}/${req.file.filename}`;
        helpContent = relativePath;
        responseContent = relativePath;
      }

      let creditsAwarded = 0;

      if (helpType === "text") {

        creditsAwarded = 2;

      } else if (helpType === "image") {

        creditsAwarded = 5;

      } else if (helpType === "video") {

        creditsAwarded = 10;
      }

      const updatedDoubt =

        await Doubt.findByIdAndUpdate(

          req.params.id,

          {
            helpType,
            helpContent,
            responseType: helpType,
            responseContent,
            mentorName,
            creditsAwarded,
            resolved: true,
            resolvedAt: new Date()
          },

          { new: true }

        );

      let updatedUser = null;
      const mentorId = req.body.mentorId;
      if (mentorId) {
        const mentorUser = await User.findById(mentorId);
        if (mentorUser) {
          mentorUser.credits =
            (mentorUser.credits || 0) + creditsAwarded;
          mentorUser.sessionsCompleted =
            (mentorUser.sessionsCompleted || 0) + 1;
          // Round to one decimal place to avoid floating-point artifacts
          mentorUser.reputation = parseFloat(
            (parseFloat(mentorUser.reputation || 5) + 0.1).toFixed(1)
          );
          await mentorUser.save();
          updatedUser = mentorUser;
        }
      }

      res.json({ updatedDoubt, updatedUser });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message: "Failed to submit help"
      });
    }
  }
);

module.exports = router;