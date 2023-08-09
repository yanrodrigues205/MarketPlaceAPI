/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Acesso` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Loja_nome_key";

-- CreateIndex
CREATE UNIQUE INDEX "Acesso_nome_key" ON "Acesso"("nome");
