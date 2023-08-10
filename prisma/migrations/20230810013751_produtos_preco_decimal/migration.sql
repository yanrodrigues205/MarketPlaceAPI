/*
  Warnings:

  - You are about to alter the column `preco` on the `Produtos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL,
    "lojaID" TEXT,
    CONSTRAINT "Produtos_lojaID_fkey" FOREIGN KEY ("lojaID") REFERENCES "Loja" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produtos" ("atualizacao_us", "criacao_us", "id", "lojaID", "nome", "preco", "quantidade") SELECT "atualizacao_us", "criacao_us", "id", "lojaID", "nome", "preco", "quantidade" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
