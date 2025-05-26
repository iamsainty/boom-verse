const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 500,
  },
  purchasedVideos: [
    {
      videoId: {
        type: String,
        required: true,
      },
      purchasedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  giftedVideos: [
    {
      videoId: {
        type: String,
      },
      giftedAt: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
