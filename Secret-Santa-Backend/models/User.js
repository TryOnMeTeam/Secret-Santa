const promisePool = require('../config/db'); 
const bcrypt = require('bcryptjs');

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [rows] = await promisePool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  return rows.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const verifyPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = { registerUser, findUserByEmail, verifyPassword };
