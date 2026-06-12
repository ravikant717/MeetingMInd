const Audio = require("../models/audio.model");
const getActionItems = require("../services/action.service");
const uploadFile = require("../services/storage.service");
const generateSummary = require("../services/summary.service");
const transcribeAudio = require("../services/transcription.service");
const storeVectors = require("../services/vector.service");
/**
 * @name uploadUserFile
 * @description uploads file to imagekit, save file info to mongodb
 * @access Private
 */
async function uploadUserFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // First upload to ImageKit
    const uploaded = await uploadFile(req.file.buffer, req.file.originalname);

    // FIX 1: Safely grab the unique file identifier from ImageKit's response
    const fileId = uploaded.fileId || uploaded.name || "";

    const transcriptResponse = await transcribeAudio(
      req.file.buffer,
      req.file.originalname,
    );

    const transcript = transcriptResponse.transcript;

    const summaryResponse = await generateSummary(transcript);
    const summary = summaryResponse.summary;

    const actionResponse = await getActionItems(transcript);
    const actionItems = actionResponse.actionItems;
    // Save file to database
    const audioTrack = await Audio.create({
      title: req.body.title || req.file.originalname.replace(/\.[^/.]+$/, ""),
      uploadedBy: req.user.id,
      audioUrl: uploaded.url,
      audioFileId: fileId,
      duration: req.body.duration || 0,
      transcript,
      summary,
      actionItems,
    });

    await storeVectors(audioTrack.audioFileId, transcript);
    return res.status(201).json({
      message: "Audio track uploaded and documented successfully",
      audio: audioTrack,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to upload file" });
  }
}

//Get a meeting details
async function getAudioByID(req, res) {
  try {
    const { audioId } = req.params;

    if (!audioId) {
      return res.status(400).json({
        message: "Audio ID required",
      });
    }

    const audioFile = await Audio.findOne({
      audioFileId: audioId,
      uploadedBy: req.user.id,
    });

    if (!audioFile) {
      return res.status(404).json({
        message: "Audio not found",
      });
    }

    const { title, transcript, audioUrl, summary, createdAt, actionItems } =
      audioFile;

    return res.status(200).json({
      message: "Audio fetched successfully",
      audio: {
        title,
        transcript,
        summary,
        audioUrl,
        createdAt,
        actionItems,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Failed to fetch audio",
    });
  }
}

//Get all meetings
async function getAudioByUser(req, res) {
  try {
    const audioFiles = await Audio.find({
      uploadedBy: req.user.id,
    })
      .select("title audioFileId summary createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      audioFiles,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Failed to fetch audio",
    });
  }
}

module.exports = {
  uploadUserFile,
  getAudioByID,
  getAudioByUser,
};
