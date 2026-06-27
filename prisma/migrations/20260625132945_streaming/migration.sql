/*
  Warnings:

  - You are about to drop the column `stream_id` on the `LiveComment` table. All the data in the column will be lost.
  - You are about to drop the column `stream_key` on the `LiveComment` table. All the data in the column will be lost.
  - Added the required column `stream_id` to the `Streaming` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream_key` to the `Streaming` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LiveComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payload" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamingId" INTEGER NOT NULL,
    CONSTRAINT "LiveComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveComment_streamingId_fkey" FOREIGN KEY ("streamingId") REFERENCES "Streaming" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LiveComment" ("created_at", "id", "payload", "streamingId", "updated_at", "userId") SELECT "created_at", "id", "payload", "streamingId", "updated_at", "userId" FROM "LiveComment";
DROP TABLE "LiveComment";
ALTER TABLE "new_LiveComment" RENAME TO "LiveComment";
CREATE TABLE "new_Streaming" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "stream_key" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Streaming_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Streaming" ("created_at", "id", "title", "userId") SELECT "created_at", "id", "title", "userId" FROM "Streaming";
DROP TABLE "Streaming";
ALTER TABLE "new_Streaming" RENAME TO "Streaming";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
