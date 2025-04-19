const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { requireUserType } = require('../middleware/authMiddleware');

// Basic stats routes (BASIC, PREMIUM, BUSINESS)
router.get('/basic', requireUserType(['BASIC', 'PREMIUM', 'BUSINESS']), statsController.getBasicStats);

// Prediction stats routes (PREMIUM, BUSINESS)
router.get('/predictions', requireUserType(['PREMIUM', 'BUSINESS']), statsController.getPredictionStats);

// Recommendation stats routes (BUSINESS only)
router.get('/recommendations', requireUserType(['BUSINESS']), statsController.getRecommendationStats);

router.get('/total-stock', statsController.getTotalStock);
router.get('/stock-demands', statsController.getStockDemandsByStatus);
router.get('/product-availability', statsController.getProductAvailability);
router.get('/pending-demands', statsController.getPendingDemands); // Add this line
router.get('/weekly-sales', statsController.getWeeklySales); // Add this line

module.exports = router;