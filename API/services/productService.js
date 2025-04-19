const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (data, userId) => {
  return await prisma.product.create({ 
    data: {
      ...data,
      userId
    } 
  });
};

exports.getAllProducts = async (userId) => {
  return await prisma.product.findMany({
    where: { userId }
  });
};

exports.getProductById = async (id, userId) => {
  return await prisma.product.findFirst({ 
    where: { 
      id: parseInt(id),
      userId 
    } 
  });
};

exports.updateProduct = async (id, data, userId) => {
  return await prisma.product.updateMany({
    where: { 
      id: parseInt(id),
      userId 
    },
    data,
  }).then(() => {
    return prisma.product.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      }
    });
  });
};

exports.deleteProduct = async (id, userId) => {
  return await prisma.product.deleteMany({ 
    where: { 
      id: parseInt(id),
      userId 
    } 
  });
};