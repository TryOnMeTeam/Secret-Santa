const express = require('express');
const router = express.Router();
const gameController = require('../controller/game.controller.js');


router.post('/api/game/createGame', gameController.createGame);
router.get('/api/game/startGame/:gameCode', gameController.startGame);
router.get("/api/game/gameinfo/:gameCode", gameController.getGameInfo);
router.post("/api/game/joinuser", gameController.joinUserToGame);

router.put('/api/game/endGame/:gameCode', gameController.createGame); //only host should end & start game

module.exports = router;