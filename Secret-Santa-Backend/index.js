const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const gameRouter = require("./routes/game.route.js");
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const messageRoutes = require("./routes/messageRoutes");
const { initializeSocketServer } = require("./service/socketService");
dotenv.config();

const app = express();
const PORT = 5001;
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(gameRouter);
app.use(authRoutes);
app.use(messageRoutes);

initializeSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
