const express = require("express");
const router = express.Router();
const multer = require("multer");
const audioController = require("../controllers/audio.controller");
const { authUser } = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  authUser,
  upload.single("audioFile"),
  audioController.uploadUserFile,
);

router.get("/", authUser, audioController.getAudioByUser);
router.get("/:audioId", authUser, audioController.getAudioByID);

module.exports = router;
