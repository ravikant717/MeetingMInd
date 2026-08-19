// services/transcription.service.js

const axios = require("axios");
const FormData = require("form-data");

async function transcribeAudio(fileBuffer, fileName) {
  const formData = new FormData();

  formData.append("file", fileBuffer, {
    filename: fileName,
    contentType: "audio/mpeg",
  });

  const response = await axios.post(
    "https://ravikant717-archivex-ai.hf.space/transcribe",
    formData,
    {
      headers: formData.getHeaders(),
    },
  );

  return response.data;
}

module.exports = transcribeAudio;
