const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (data) => {
  return await prisma.product.create({ data });
};

exports.getAllProducts = async () => {
  return await prisma.product.findMany();
};

exports.getProductById = async (id) => {
  return await prisma.product.findUnique({ where: { id: parseInt(id) } });
};

exports.updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data,
  });
};

exports.deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: parseInt(id) } });
};