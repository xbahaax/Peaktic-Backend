const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get total stock for all products
exports.getTotalStock = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    res.status(200).json({ totalStock });
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