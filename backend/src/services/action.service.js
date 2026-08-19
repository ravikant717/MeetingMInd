const axios = require("axios");

async function getActionItems(transcript) {
  const response = await axios.post("https://ravikant717-archivex-ai.hf.space/action", {
    transcript,
  });

  return response.data;
}

module.exports = getActionItems;
