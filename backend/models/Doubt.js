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

  studentName: {
    type: String,
    default: ""
  },

  helpType: {
  type: String,
  enum: ["text", "image", "video"],
  default: null
},

helpContent: {
  type: String,
  default: ""
},

mentorName: {
  type: String,
  default: ""
},

creditsAwarded: {
  type: Number,
  default: 0
},

resolved: {
  type: Boolean,
  default: false
},
responseType: {
  type: String,
  enum: ["text", "image", "video"],
  default: "text"
},

responseContent: {
  type: String,
  default: ""
},

resolvedAt: {
  type: Date,
  default: null
}

}, {

  timestamps: true

});

module.exports =
  mongoose.model("Doubt", doubtSchema);