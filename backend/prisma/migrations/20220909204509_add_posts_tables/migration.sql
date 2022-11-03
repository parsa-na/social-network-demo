-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
