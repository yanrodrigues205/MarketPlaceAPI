import { Router } from "express";
import { criarUsuario } from "./controller/UsuarioController";
import { criarProduto  } from "./controller/ProdutosController";
export const rotas = Router();

rotas.post("/usuario", criarUsuario);
rotas.post("/cadastrar_produto", criarProduto);