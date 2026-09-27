const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout, getMe } = require('../controllers/authController');
const { registerRules, loginRules } = require('../validators/authValidator');
const validate = require('../middleware/validateMiddleware');
const authenticate = require('../middleware/authMiddleware');

// Public routes with express-validator
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.post('/refresh-token', refreshToken);

// Authenticated routes
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

module.exports = router;
