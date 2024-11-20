const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const secretSantaRouter = require("./routes/secretSanta.route");
const gameRouter = require("./routes/game.route.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", secretSantaRouter);
app.use("/api/game", gameRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
