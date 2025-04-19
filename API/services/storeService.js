const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createStore = async (data, userId) => {
  return await prisma.store.create({ 
    data: {
      ...data,
      userId
    } 
  });
};

exports.getAllStores = async (userId) => {
  return await prisma.store.findMany({
    where: { userId }
  });
};

exports.getStoreById = async (id, userId) => {
  return await prisma.store.findFirst({ 
    where: { 
      id: parseInt(id),
      userId 
    } 
  });
};

exports.updateStore = async (id, data, userId) => {
  return await prisma.store.updateMany({
    where: { 
      id: parseInt(id),
      userId 
    },
    data,
  }).then(() => {
    return prisma.store.findFirst({
      where: { 
        id: parseInt(id),
        userId 
      }
    });
  });
};

exports.deleteStore = async (id, userId) => {
  return await prisma.store.deleteMany({ 
    where: { 
      id: parseInt(id),
      userId 
    } 
  });
};