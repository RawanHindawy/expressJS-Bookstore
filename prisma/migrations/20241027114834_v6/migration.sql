-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
