const productService = require('../services/productService');
const { exec } = require('child_process');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.user.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id, req.user.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body, req.user.id);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id, req.user.id);
    if (deleted.count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Process CSV file for predictions
exports.predictCsv = async (req, res) => {
  try {
    const inputCsvPath = req.file.path;
    const outputCsvPath = path.join(__dirname, '../output', `output_${Date.now()}.csv`);

    exec(`python c:\\Users\\DELL\\Desktop\\Back\\Peaktic-Backend\\API\\predict.py ${inputCsvPath} ${outputCsvPath}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.download(outputCsvPath, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};