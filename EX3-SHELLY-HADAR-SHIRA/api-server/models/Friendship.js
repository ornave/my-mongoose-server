const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friend_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
