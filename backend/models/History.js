const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  imageName: {
    type: String,
    required: true
  },

  imagePath: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ""
  },

  confidence: {
    type: String,
    default: ""
  },

  tags: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

module.exports =
  mongoose.model(
    "History",
    historySchema
  );