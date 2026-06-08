const axios = require("axios");

async function generateSummary(transcript) {
  const response = await axios.post("http://localhost:8000/summary", {
    transcript,
  });

  return response.data;
}

module.exports = generateSummary;
