/*
  Warnings:

  - You are about to drop the `LiveComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LiveComments";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "LiveComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payload" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamingId" INTEGER NOT NULL,
    CONSTRAINT "LiveComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LiveComment_streamingId_fkey" FOREIGN KEY ("streamingId") REFERENCES "Streaming" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
