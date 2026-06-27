/*
  Warnings:

  - Added the required column `stream_id` to the `LiveComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream_key` to the `LiveComment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LiveComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payload" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "stream_key" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamingId" INTEGER NOT NULL,
    CONSTRAINT "LiveComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveComment_streamingId_fkey" FOREIGN KEY ("streamingId") REFERENCES "Streaming" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LiveComment" ("created_at", "id", "payload", "streamingId", "updated_at", "userId") SELECT "created_at", "id", "payload", "streamingId", "updated_at", "userId" FROM "LiveComment";
DROP TABLE "LiveComment";
ALTER TABLE "new_LiveComment" RENAME TO "LiveComment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
