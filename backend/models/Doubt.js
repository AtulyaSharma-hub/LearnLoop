const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  urgency: {
    type: String,
    default: "Medium"
  },

  solved: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model("Doubt", doubtSchema);