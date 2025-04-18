import { PrismaClient } from "@prisma/client";
import { Model } from "sequelize";

const prisma = new PrismaClient();
console.log("Connected to DB")

export const Product = prisma.product;
export const StockDemand = prisma.stockDemand;
export const Store = prisma.store;
export const Prediction = prisma.prediction;


export default prisma;