const express = require('express');
const router = express.Router();
const clientPortalController = require('../controllers/clientPortalController');
const contractsController = require('../controllers/contractsController');
const { authenticateToken, requireClient } = require('../middleware/auth');

router.use(authenticateToken);
router.use(requireClient);

router.get('/dashboard', clientPortalController.getDashboard);
router.get('/my-sites', clientPortalController.getMySites);
router.get('/my-packages', clientPortalController.getMyPackages);
router.get('/my-contracts', contractsController.getMyContracts);
router.get('/contracts/:id', contractsController.getContract);
router.post('/contracts/:id/sign', contractsController.signContract);
router.get('/contracts/:id/pdf', contractsController.getContractPdf);

router.get('/notes', clientPortalController.getNotes);
router.post('/notes', clientPortalController.createNote);
router.get('/todos', clientPortalController.getTodos);
router.put('/todos/:id', clientPortalController.updateTodo);
router.get('/feedback', clientPortalController.getMyFeedback);
router.post('/feedback', clientPortalController.submitFeedback);
router.get('/milestones', clientPortalController.getMilestones);
router.get('/activity', clientPortalController.getActivity);

module.exports = router;
