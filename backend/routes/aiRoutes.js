// const express = require("express");
// const OpenAI = require("openai");

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// router.post("/ask-ai", async (req, res) => {

//   try {

//     const { question } = req.body;

//     const completion =
//       await openai.chat.completions.create({

//         model: "gpt-3.5-turbo",

//         messages: [
//           {
//             role: "user",
//             content: question
//           }
//         ]

//       });

//     res.json({
//       answer:
//         completion.choices[0]
//         .message.content
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });
//   }
// });

// module.exports = router;