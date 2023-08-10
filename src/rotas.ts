import { Router } from "express";
import { criarUsuario, deletarUsuarios } from "./controller/UsuarioController";
import { criarProduto, pegarProdutos  } from "./controller/ProdutosController";
import { criarAcesso, pegarAcessos } from "./controller/AcessoController";
import { criarLoja, pegarLojas } from "./controller/LojaController";

export const rotas = Router();

//USUARIO
rotas.post("/cadastrar_usuario", criarUsuario);
//rotas.delete("/deletar_usuarios", deletarUsuarios);

//PRODUTOS
rotas.post("/cadastrar_produto", criarProduto);
rotas.get("/buscar_produtos", pegarProdutos)

//ACESSO
rotas.post("/cadastrar_acesso", criarAcesso);
rotas.get("/buscar_acessos", pegarAcessos);

//LOJA
rotas.post("/cadastrar_loja", criarLoja);
rotas.get("/buscar_lojas", pegarLojas);
