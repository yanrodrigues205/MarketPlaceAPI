/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Loja` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Loja_nome_key" ON "Loja"("nome");
