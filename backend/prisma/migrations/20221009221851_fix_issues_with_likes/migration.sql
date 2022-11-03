/*
  Warnings:

  - You are about to drop the column `usersLikedId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_usersLikedId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "usersLikedId";

-- CreateTable
CREATE TABLE "_likedCommets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedCommets_AB_unique" ON "_likedCommets"("A", "B");

-- CreateIndex
CREATE INDEX "_likedCommets_B_index" ON "_likedCommets"("B");

-- AddForeignKey
ALTER TABLE "_likedCommets" ADD CONSTRAINT "_likedCommets_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedCommets" ADD CONSTRAINT "_likedCommets_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
