const db = require("../config/db.js");

async function getUserDetailsById(userId) {
  const query = `SELECT email, name 
      FROM User
      WHERE id = ?`;
  try {
    const [results] = await db.query(query, [userId]);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { getUserDetailsById };
