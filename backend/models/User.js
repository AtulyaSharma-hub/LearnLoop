const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  credits: {
    type: Number,
    default: 0
  },

  reputation: {
    type: Number,
    default: 5
  },

  sessionsCompleted: {
    type: Number,
    default: 0
  },
  role: {
  type: String,
  enum: ["Student", "Teacher", "Both"],
  default: "Student"
}

} ,{

  timestamps: true

}
);

module.exports =
  mongoose.model("User", userSchema);