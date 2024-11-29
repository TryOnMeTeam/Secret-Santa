const authService = require('../service/AuthService');
const response = require('../utils/response.js');

/**
 * Register a new user.
 *
 * @route POST /api/auth/register
 * @example
 * Request Body:
 * {
 *   "name": "John Doe",
 *   "email": "john.doe@example.com",
 *   "password": "securePassword123"
 * }
 *
 * Response:
 * {
 *   "status": 200,
 *   "message": "User Registered Successfully",
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "userId": 123
 *   }
 * }
 */
const registerUserForSecretSanta = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.registerUser(name, email, password);
  return response(res, result.status, result.response);
};

/**
 * Log in an existing user.
 *
 * @route POST /api/auth/login
 * @example
 * Request Body:
 * {
 *   "email": "john.doe@example.com",
 *   "password": "securePassword123"
 * }
 *
 * Response:
 * {
 *   "status": 200,
 *   "message": "Login Successfully",
 *   "data": {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *     "userId": 123
 *   }
 * }
 */
const loginUserForSecretSanta = async (req, res) => {
  const { email, password } = req.body;
  const { token, userId } = await authService.loginUser(email, password);
  return response(res, result.status, result.response);
};

module.exports = {
  registerUserForSecretSanta,
  loginUserForSecretSanta
};
