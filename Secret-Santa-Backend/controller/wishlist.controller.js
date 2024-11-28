const {
  getUserWishlist,
  createUserWishlist,
} = require("../services/wishlist.service.js");

const {
  getGameInfo
} = require("../services/game.service.js");

// Get wishlist by userId
const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await getUserWishlist(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update wishlist
const createWishlist = async (req, res) => {
  const { userId, gameCode, payload } = req.body;
  const wish = payload;

  if (!wish) {
    return res.status(404).json({ message: "Add a Wish." });
  }

  try {
    const gameRes = await getGameInfo(gameCode);
    const gameId = gameRes[0].id;
    const result = await createUserWishlist(Number(userId), wish, gameId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, createWishlist };
