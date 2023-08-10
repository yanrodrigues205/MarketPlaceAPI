-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loja" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL,
    "usuarioID" TEXT,
    CONSTRAINT "Loja_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Loja" ("atualizacao_us", "criacao_us", "id", "nome") SELECT "atualizacao_us", "criacao_us", "id", "nome" FROM "Loja";
DROP TABLE "Loja";
ALTER TABLE "new_Loja" RENAME TO "Loja";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
