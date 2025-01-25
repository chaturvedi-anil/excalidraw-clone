/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `AppUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppUser_username_key" ON "AppUser"("username");
