const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/WishlistController.js')
const { protect } = require('../middleware/authMiddleware.js');


router.get("/api/user/wishlist/:userId", wishlistController.getSecretSantaWishlist);
router.post("/api/user/createwishlist", wishlistController.addWishToUserWishlist);
router.get('/api/user/wishlist', wishlistController.getWishlistByUserAndGameCode);

module.exports = router;