const db = require("../config/db.js");

// Get user wishlist
async function getUserWishlist(userId) {
  const query = `
    SELECT u.name, w.name AS wishName
    FROM User u
    LEFT JOIN Wishlist w ON u.id = w.userId
    WHERE u.id = ?`;

  try {
    const [results] = await db.query(query, [userId]);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Create or update wishlist
async function createUserWishlist(userId, wishes) {
  const query = "INSERT INTO Wishlist (name, userId) VALUES ?";
  const values = wishes.map((wish) => [wish.name, userId]);

  try {
    await db.query(query, [values]);
    return { message: "Wishlist created successfully." };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getUserWishlist, createUserWishlist };
