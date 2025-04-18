const storeService = require('../services/storeService');

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeService.getAllStores();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await storeService.getStoreById(req.params.id);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a store
exports.updateStore = async (req, res) => {
  try {
    const updatedStore = await storeService.updateStore(req.params.id, req.body);
    if (updatedStore) {
      res.status(200).json(updatedStore);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a store
exports.deleteStore = async (req, res) => {
  try {
    const deleted = await storeService.deleteStore(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};