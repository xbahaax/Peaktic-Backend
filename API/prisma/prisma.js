import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Connected to DB")

export const Admin = prisma.admin;
export const Category = prisma.category;
export const Product = prisma.product;
export const MediaProduct = prisma.mediaProduct;
export const History = prisma.history;
export const Order = prisma.order;
export const OrderProduct = prisma.orderProduct;
export const Wilaya = prisma.wilaya;
export const Contact = prisma.contact;

export default prisma;