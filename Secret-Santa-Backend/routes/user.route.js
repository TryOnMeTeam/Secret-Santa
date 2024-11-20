const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authenticate.js');
const userController = require('../controller/user.controller.js');

router.post('/wishlist/:userId', userController.createGame);
router.put('/joinGame/:gameCode/:userId', userController.createGame);

module.exports = router;
