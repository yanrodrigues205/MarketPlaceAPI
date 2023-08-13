import { Router } from "express";
import { criarUsuario, pegarUsuarios, deletarUsuarios } from "./controller/UsuarioController";
import { criarProduto, pegarProdutos  } from "./controller/ProdutosController";
import { criarAcesso, pegarAcessos } from "./controller/AcessoController";
import { criarLoja, pegarLojas } from "./controller/LojaController";
import { logar } from "./controller/SessaoController";


export const rotas = Router();

rotas.get("/", (req, res) => { // rota inicial 
    res.render("cadastro/usuario");
})

//ATUTTENTICACAO
rotas.post("/logar", logar);

//USUARIO
rotas.post("/cadastrar_usuario", criarUsuario);
rotas.delete("/deletar_todos_usuarios", deletarUsuarios);
rotas.get("/buscar_usuarios", pegarUsuarios);

//PRODUTOS
rotas.post("/cadastrar_produto", criarProduto);
rotas.get("/buscar_produtos", pegarProdutos)

//ACESSO
rotas.post("/cadastrar_acesso", criarAcesso);
rotas.get("/buscar_acessos", pegarAcessos);

//LOJA
rotas.post("/cadastrar_loja", criarLoja);
rotas.get("/buscar_lojas", pegarLojas);
