const stockDemandService = require('../services/stockDemandService');

// Create a new stock demand
exports.createStockDemand = async (req, res) => {
  try {
    const stockDemand = await stockDemandService.createStockDemand(req.body);
    res.status(201).json(stockDemand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stock demands
exports.getAllStockDemands = async (req, res) => {
  try {
    const stockDemands = await stockDemandService.getAllStockDemands();
    res.status(200).json(stockDemands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a stock demand by ID
exports.getStockDemandById = async (req, res) => {
  try {
    const stockDemand = await stockDemandService.getStockDemandById(req.params.id);
    if (stockDemand) {
      res.status(200).json(stockDemand);
    } else {
      res.status(404).json({ message: 'Stock demand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a stock demand
exports.updateStockDemand = async (req, res) => {
  try {
    const updatedStockDemand = await stockDemandService.updateStockDemand(req.params.id, req.body);
    if (updatedStockDemand) {
      res.status(200).json(updatedStockDemand);
    } else {
      res.status(404).json({ message: 'Stock demand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a stock demand
exports.deleteStockDemand = async (req, res) => {
  try {
    const deleted = await stockDemandService.deleteStockDemand(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Stock demand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};