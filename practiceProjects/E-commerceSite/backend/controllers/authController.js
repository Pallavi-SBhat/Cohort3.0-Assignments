const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate access token
const generateAccessToken = (userId) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || 'default_access_token_secret_32chars_long!';
  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  });
};

// Helper to generate refresh token
const generateRefreshToken = (userId) => {
  const secret = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret_32chars_long!';
  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  });
};

// Cookie options for refresh token
const getCookieOptions = () => ({
  httpOnly: true, // Prevents XSS access
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
});


/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already registered. Please log in.',
      });
    }

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Do NOT return tokens on register per assignment requirements
    return res.status(201).json({
      success: true,
      message: 'User registered successfully. Please log in.',
      user: user.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

/**
 * @desc    Login user & issue access + refresh tokens
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Generic message to avoid revealing which field was wrong
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user record in DB
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken,
      refreshToken, // returned in JSON body as well as httpOnly cookie
      user: user.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

/**
 * @desc    Refresh Access Token
 * @route   POST /api/auth/refresh-token
 * @access  Public (Requires valid refresh token)
 */
const refreshToken = async (req, res) => {
  try {
    // Read refresh token from cookie or request body
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token missing. Please log in again.',
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret_32chars_long!');
    } catch (err) {
      // Clear cookie on invalid/expired token
      res.clearCookie('refreshToken', getCookieOptions());
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token. Please log in again.',
      });
    }

    // Find user and check if token exists in DB record
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.clearCookie('refreshToken', getCookieOptions());
      return res.status(401).json({
        success: false,
        message: 'User not found. Please log in again.',
      });
    }

    const tokenIndex = user.refreshTokens.findIndex((rt) => rt.token === token);
    if (tokenIndex === -1) {
      // Token reuse / revoked token detected
      res.clearCookie('refreshToken', getCookieOptions());
      return res.status(403).json({
        success: false,
        message: 'Refresh token has been revoked or used. Please log in again.',
      });
    }

    // Rotate refresh token: Remove old token & create a new one
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshTokens.splice(tokenIndex, 1);
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during token refresh',
      error: error.message,
    });
  }
};

/**
 * @desc    Logout user & invalidate refresh token
 * @route   POST /api/auth/logout
 * @access  Authenticated / Public with token
 */
const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret_32chars_long!');
        const user = await User.findById(decoded.userId);
        if (user) {
          // Remove token from DB
          user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== token);
          await user.save();
        }
      } catch (err) {
        // Token verification failed or expired, proceed to clear cookie anyway
      }
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken', getCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message,
    });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Authenticated
 */
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching user profile',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
};
