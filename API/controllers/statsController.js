const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Basic stats (BASIC, PREMIUM, BUSINESS)
exports.getBasicStats = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    
    const pendingDemands = await prisma.stockDemand.findMany({
      where: { status: 'WAITING' },
    });
    
    res.status(200).json({ 
      totalStock,
      pendingDemands: pendingDemands.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Prediction stats (PREMIUM, BUSINESS)
exports.getPredictionStats = async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      include: {
        product: true,
        store: true
      }
    });
    
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recommendation stats (BUSINESS only)
exports.getRecommendationStats = async (req, res) => {
  try {
    // This would typically involve more complex business logic
    // For now, we'll return a simple recommendation
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lt: 10
        }
      }
    });
    
    const recommendations = lowStockProducts.map(product => ({
      productId: product.id,
      productName: product.name,
      currentStock: product.stock,
      recommendedAction: 'Restock',
      recommendedQuantity: 50 - product.stock
    }));
    
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock demands by status
exports.getStockDemandsByStatus = async (req, res) => {
  try {
    const status = req.query.status || 'WAITING';
    const stockDemands = await prisma.stockDemand.findMany({
      where: { status },
    });
    res.status(200).json(stockDemands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product availability
exports.getProductAvailability = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { disponible: true },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending demands
exports.getPendingDemands = async (req, res) => {
  try {
    const pendingDemands = await prisma.stockDemand.findMany({
      where: { status: 'WAITING' },
    });
    res.status(200).json(pendingDemands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales for the week
exports.getWeeklySales = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const sales = await prisma.stockDemand.findMany({
      where: {
        status: 'COMPLETED',
        date: {
          gte: oneWeekAgo,
        },
      },
    });

    const totalSales = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};