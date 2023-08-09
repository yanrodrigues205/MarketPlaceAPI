import { Router } from "express";
import { criarUsuario, deletarUsuarios } from "./controller/UsuarioController";
import { criarProduto  } from "./controller/ProdutosController";
import { criarAcesso, pegarAcessos } from "./controller/AcessoController";

export const rotas = Router();

//USUARIO
rotas.post("/cadastrar_usuario", criarUsuario);
rotas.delete("/deletar_usuarios", deletarUsuarios);

//PRODUTOS
rotas.post("/cadastrar_produto", criarProduto);

//ACESSO
rotas.post("/cadastrar_acesso", criarAcesso);
rotas.get("/buscar_acessos", pegarAcessos);
