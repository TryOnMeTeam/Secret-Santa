const db = require("../config/db.js");

// Get game info by gameCode
async function getGameInfo(gameCode) {
    const query = `
      SELECT g.name AS gameName, u.name AS userName, u.email
      FROM Game g
      LEFT JOIN User_Game ug ON g.id = ug.gameId
      LEFT JOIN User u ON ug.userId = u.id
      WHERE g.gameCode = ?`;

      try {
        const results = await db.query(query, [gameCode]);
        return results;
      } catch (err) {
        throw new Error(err.message);
      }
}

// Add user to a game
async function joinUserToGame(userId, gameCode) {
  const findQuery = `
    SELECT * FROM User_Game ug
    LEFT JOIN Game g ON ug.gameId = g.id
    WHERE ug.userId = ? AND g.gameCode = ?`;

  const insertQuery = `
    INSERT INTO User_Game (userId, gameId)
    SELECT ?, g.id FROM Game g WHERE g.gameCode = ?`;

  try {
    // Check if the user is already part of the game
    const existingUser = await db.query(findQuery, [userId, gameCode]);

    if (existingUser.length > 0) {
      throw new Error("User has already joined this game.");
    }

    // Insert the user into the game
    await db.query(insertQuery, [userId, gameCode]);
    return { message: "User successfully joined the game." };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getGameInfo, joinUserToGame };
