const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);

module.exports = router;