-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL,
    "acessoID" TEXT,
    CONSTRAINT "Usuario_acessoID_fkey" FOREIGN KEY ("acessoID") REFERENCES "Acesso" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL,
    "lojaID" TEXT,
    CONSTRAINT "Produtos_lojaID_fkey" FOREIGN KEY ("lojaID") REFERENCES "Loja" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criacao_us" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacao_us" DATETIME NOT NULL
);
