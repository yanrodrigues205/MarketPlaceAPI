/*
  Warnings:

  - You are about to alter the column `preco` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `acessoID` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UsuarioAcesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioID" TEXT,
    "acessoID" TEXT,
    CONSTRAINT "UsuarioAcesso_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UsuarioAcesso_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Acesso" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "quantidade" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL,
    "lojaID" TEXT,
    CONSTRAINT "Produtos_lojaID_fkey" FOREIGN KEY ("lojaID") REFERENCES "Loja" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produtos" ("atualizacao_us", "criacao_us", "id", "lojaID", "nome", "preco", "quantidade") SELECT "atualizacao_us", "criacao_us", "id", "lojaID", "nome", "preco", "quantidade" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("atualizacao_us", "criacao_us", "email", "id", "nome", "senha") SELECT "atualizacao_us", "criacao_us", "email", "id", "nome", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
