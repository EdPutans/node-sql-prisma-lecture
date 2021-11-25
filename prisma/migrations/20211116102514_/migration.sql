/*
  Warnings:

  - Made the column `name` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Artist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT
);
INSERT INTO "new_Album" ("id", "image", "name") SELECT "id", "image", "name" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT
);
INSERT INTO "new_Artist" ("id", "image", "name") SELECT "id", "image", "name" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
