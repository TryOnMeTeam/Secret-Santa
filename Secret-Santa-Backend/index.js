const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoutes = require('./routes/GameRoute.js');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/WishlistRoute');
const dotenv = require('dotenv');
const messageRoutes = require("./routes/messageRoutes");
require('./service/SchedulerService.js');
dotenv.config();

const app = express();
const PORT = 5001;
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(gameRoutes);
app.use(authRoutes);
app.use(messageRoutes);
app.use(messageRoutes);
app.use(wishlistRoutes);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
