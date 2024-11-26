const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/response.js');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
    
  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return sendResponse(res, 400, 'Email already in use');
    }

    const userId = await User.registerUser(username, email, password);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return sendResponse(res, 200, 'User Registered Successfully', { token, userId });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, 'Server error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return sendResponse(res, 400, 'Invalid credentials');
    }

    const isMatch = await User.verifyPassword(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 400, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const data = {
      token: token,
      userId: user.id
    }

    return sendResponse(res, 200, 'Login Successfully', data);
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, 'Server error');
  }
};

module.exports = { registerUser, loginUser };