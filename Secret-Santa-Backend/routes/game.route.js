const express = require('express');
const router = express.Router();
const gameController = require('../controller/GameController.js');
const { protect } = require('../middleware/authMiddleware.js');


router.post('/api/game/createGame', gameController.createNewSecretSantaGame);
router.get('/api/game/startGame/:gameCode', protect, gameController.startSecretSantaGame);
router.get("/api/game/gameinfo/:gameCode", gameController.getSecretSantaGameInfo);
router.post("/api/game/joinuser", protect, gameController.joinUserToSecretSantaGame);
router.get('/api/game/isActive/:gameId', protect, gameController.getGameActiveStatus);
router.delete("/api/game/endGame", gameController.endGame);

module.exports = router;