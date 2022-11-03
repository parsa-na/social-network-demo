/*
  Warnings:

  - You are about to drop the column `likes` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likeArticles` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likeCommnets` on the `User` table. All the data in the column will be lost.
  - Added the required column `usersLikedId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likes",
ADD COLUMN     "usersLikedId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "likeArticles",
DROP COLUMN "likeCommnets",
ALTER COLUMN "bio" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_userslikedarticles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userslikedarticles_AB_unique" ON "_userslikedarticles"("A", "B");

-- CreateIndex
CREATE INDEX "_userslikedarticles_B_index" ON "_userslikedarticles"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_usersLikedId_fkey" FOREIGN KEY ("usersLikedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userslikedarticles" ADD CONSTRAINT "_userslikedarticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userslikedarticles" ADD CONSTRAINT "_userslikedarticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
