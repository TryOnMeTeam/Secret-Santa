const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authenticate.js');
const wishlistController = require("../controller/wishlist.controller.js");



// http://localhost:5001/api/user/wishlist/1
router.get("/api/user/wishlist/:userId", wishlistController.getWishlist);

// http://localhost:5001/api/user/createwishlist/2

// {
//     "name" : "wish",
//     "link": "link link"
// }

router.post("/api/user/createwishlist", wishlistController.createWishlist);

module.exports = router;
