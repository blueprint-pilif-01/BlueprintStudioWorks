const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again later.' },
  standardHeaders: true,
  skipSuccessfulRequests: true,
});

router.post('/admin/login', loginLimiter, authController.adminLogin);
router.post('/client/login', loginLimiter, authController.clientLogin);
router.post('/client/accept-invite', authController.acceptInvite);

router.get('/me', authenticateToken, authController.me);

module.exports = router;
