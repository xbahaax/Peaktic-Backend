const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/total-stock', statsController.getTotalStock);
router.get('/stock-demands', statsController.getStockDemandsByStatus);
router.get('/product-availability', statsController.getProductAvailability);
router.get('/pending-demands', statsController.getPendingDemands); // Add this line
router.get('/weekly-sales', statsController.getWeeklySales); // Add this line

module.exports = router;