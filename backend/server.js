require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(3000, async () => {
  await connectDB();

  console.log("Server is running on port 3000");
});
