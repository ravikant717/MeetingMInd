const axios = require("axios");

async function generateSummary(transcript) {
  const response = await axios.post("https://ravikant717-archivex-ai.hf.space/summary", {
    transcript,
  });

  return response.data;
}

module.exports = generateSummary;
