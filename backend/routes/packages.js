const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packagesController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public - no auth
router.get('/', packagesController.list);

// Admin only
router.use(authenticateToken);
router.use(requireAdmin);
router.post('/', packagesController.create);
router.put('/:id', packagesController.update);
router.delete('/:id', packagesController.remove);

module.exports = router;
