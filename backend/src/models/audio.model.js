const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    audioFileId: {
      type: String,
    },

    duration: {
      type: Number,
    },

    transcript: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },
    actionItems: [
      {
        task: String,
        owner: String,
        deadline: String,
      },
    ],
    status: {
      type: String,
      enum: ["uploaded", "processing", "completed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  },
);

const Audio = mongoose.model("audio", audioSchema);

module.exports = Audio;
