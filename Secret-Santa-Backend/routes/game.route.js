const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authenticate.js');
const gameController = require('../controller/game.controller.js');


router.post('/createGame', gameController.createGame);
router.put('/startGame/:gameCode', gameController.createGame);
router.put('/endGame/:gameCode', gameController.createGame); //only host should end & start game

module.exports = router;
