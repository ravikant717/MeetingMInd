const axios = require("axios");

async function storeVectors(audioId, transcript) {
  const response = await axios.post(
    "https://ravikant717-archivex-ai.hf.space/store-vectors",
    {
      audioId,
      transcript,
    }
  );

  return response.data;
}

module.exports = storeVectors;