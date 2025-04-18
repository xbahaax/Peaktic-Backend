const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createStockDemand = async (data) => {
  const product = await prisma.product.findUnique({ where: { id: data.productId } });
  if (!product || product.stock < data.quantity) {
    throw new Error('Product not available or insufficient stock');
  }
  return await prisma.stockDemand.create({ data });
};

exports.getAllStockDemands = async () => {
  return await prisma.stockDemand.findMany();
};

exports.getStockDemandById = async (id) => {
  return await prisma.stockDemand.findUnique({ where: { id: parseInt(id) } });
};

exports.updateStockDemand = async (id, data) => {
  return await prisma.stockDemand.update({
    where: { id: parseInt(id) },
    data,
  });
};

exports.deleteStockDemand = async (id) => {
  return await prisma.stockDemand.delete({ where: { id: parseInt(id) } });
};