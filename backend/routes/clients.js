const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const packagesController = require('../controllers/packagesController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/stats', clientsController.stats);
router.get('/feedback', clientsController.listAllFeedback);
router.put('/feedback/:id', clientsController.replyFeedback);
router.get('/', clientsController.list);
router.get('/activity', clientsController.listActivity);
router.post('/invites', clientsController.createInvite);
router.put('/:clientId/sites', clientsController.assignSites);
router.get('/:clientId/site-urls', clientsController.listExternalSites);
router.post('/:clientId/site-url', clientsController.addSiteUrl);
router.delete('/:clientId/site-url/:siteId', clientsController.removeSiteUrl);
router.get('/:clientId/packages', clientsController.listClientPackages);
router.post('/:clientId/packages', packagesController.assignToClient);
router.get('/:clientId/milestones', clientsController.listMilestones);
router.post('/:clientId/milestones', clientsController.createMilestone);
router.put('/:clientId/milestones/:id', clientsController.updateMilestone);
router.delete('/:clientId/milestones/:id', clientsController.deleteMilestone);

module.exports = router;
