-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsuarioAcesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioID" TEXT,
    "acessoID" TEXT,
    CONSTRAINT "UsuarioAcesso_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UsuarioAcesso_acessoID_fkey" FOREIGN KEY ("acessoID") REFERENCES "Acesso" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UsuarioAcesso" ("acessoID", "id", "usuarioID") SELECT "acessoID", "id", "usuarioID" FROM "UsuarioAcesso";
DROP TABLE "UsuarioAcesso";
ALTER TABLE "new_UsuarioAcesso" RENAME TO "UsuarioAcesso";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
