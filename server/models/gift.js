const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  amount: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Gift = mongoose.models.Gift || mongoose.model("Gift", giftSchema);

module.exports = Gift;
