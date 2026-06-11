const axios = require("axios");

async function getActionItems(transcript) {
  const response = await axios.post("http://localhost:8000/action", {
    transcript,
  });

  return response.data;
}

module.exports = getActionItems;
