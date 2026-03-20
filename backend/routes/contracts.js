const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contractsController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Admin only
router.use(authenticateToken);
router.use(requireAdmin);
router.get('/', contractsController.listContracts);
router.get('/templates', contractsController.listTemplates);
router.post('/templates', contractsController.createTemplate);
router.put('/templates/:id', contractsController.updateTemplate);
router.post('/generate', contractsController.generate);

module.exports = router;
