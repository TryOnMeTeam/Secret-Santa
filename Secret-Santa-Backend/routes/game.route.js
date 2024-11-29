const express = require('express');
const router = express.Router();
const gameController = require('../controller/GameController.js');
const { protect } = require('../middleware/authMiddleware.js');


router.post('/api/game/createGame', protect, gameController.createNewSecretSantaGame);
router.get('/api/game/startGame/:gameCode', protect, gameController.startSecretSantaGame);
router.get("/api/game/gameinfo/:gameCode", protect, gameController.getSecretSantaGameInfo);
router.post("/api/game/joinuser", protect, gameController.joinUserToSecretSantaGame);

module.exports = router;