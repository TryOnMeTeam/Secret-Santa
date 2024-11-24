const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authenticate.js');
const userController = require('../controller/user.controller.js');
const wishlistController = require("../controller/wishlist.controller.js");


// router.put('/api/user/joinGame/:gameCode/:userId', userController.createGame);

// http://localhost:5001/api/user/wishlist/1
router.get("/api/user/wishlist/:userId", wishlistController.getWishlist);

router.post("/api/user/createwishlist/:userId", wishlistController.createWishlist);

module.exports = router;
