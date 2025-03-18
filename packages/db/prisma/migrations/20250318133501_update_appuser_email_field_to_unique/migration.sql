/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `AppUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");
