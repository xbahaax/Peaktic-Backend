const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createStore = async (data) => {
  return await prisma.store.create({ data });
};

exports.getAllStores = async () => {
  return await prisma.store.findMany();
};

exports.getStoreById = async (id) => {
  return await prisma.store.findUnique({ where: { id: parseInt(id) } });
};

exports.updateStore = async (id, data) => {
  return await prisma.store.update({
    where: { id: parseInt(id) },
    data,
  });
};

exports.deleteStore = async (id) => {
  return await prisma.store.delete({ where: { id: parseInt(id) } });
};