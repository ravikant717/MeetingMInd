const axios = require("axios");

async function storeVectors(audioId, transcript) {
  const response = await axios.post(
    "http://localhost:8000/store-vectors",
    {
      audioId,
      transcript,
    }
  );

  return response.data;
}

module.exports = storeVectors;