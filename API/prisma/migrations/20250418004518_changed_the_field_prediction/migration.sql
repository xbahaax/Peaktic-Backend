/*
  Warnings:

  - You are about to drop the column `date` on the `Prediction` table. All the data in the column will be lost.
  - Added the required column `week` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "predictedQty" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    CONSTRAINT "Prediction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Prediction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prediction" ("id", "predictedQty", "productId", "storeId") SELECT "id", "predictedQty", "productId", "storeId" FROM "Prediction";
DROP TABLE "Prediction";
ALTER TABLE "new_Prediction" RENAME TO "Prediction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
