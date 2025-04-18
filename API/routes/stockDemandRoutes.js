const express = require('express');
const router = express.Router();
const stockDemandController = require('../controllers/stockDemandController');

router.post('/', stockDemandController.createStockDemand);
router.get('/', stockDemandController.getAllStockDemands);
router.get('/:id', stockDemandController.getStockDemandById);
router.put('/:id', stockDemandController.updateStockDemand);
router.delete('/:id', stockDemandController.deleteStockDemand);

module.exports = router;