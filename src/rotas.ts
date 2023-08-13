import { Router } from "express";
import { criarUsuario, pegarUsuarios, deletarUsuarios } from "./controller/UsuarioController";
import { criarProduto, pegarProdutos  } from "./controller/ProdutosController";
import { criarAcesso, pegarAcessos } from "./controller/AcessoController";
import { criarLoja, pegarLojas } from "./controller/LojaController";
import { logar } from "./controller/SessaoController";
import { autenticaMiddleware } from "./middleware/AuthMiddleware";


export const rotas = Router();

rotas.get("/", (req, res) => { // rota inicial 
    res.render("cadastro/usuario");
})

//ATUTTENTICACAO
rotas.post("/logar", logar);

//USUARIO
rotas.post("/cadastrar_usuario", autenticaMiddleware(["Adm"]), criarUsuario);
rotas.delete("/deletar_todos_usuarios", autenticaMiddleware(["Adm"]), deletarUsuarios);
rotas.get("/buscar_usuarios",autenticaMiddleware(["Adm"]), pegarUsuarios);

//PRODUTOS
rotas.post("/cadastrar_produto",autenticaMiddleware(["Adm", "Vendedor"]), criarProduto);
rotas.get("/buscar_produtos",autenticaMiddleware(["Adm", "Vendedor", "Comprador"]),  pegarProdutos)

//ACESSO
rotas.post("/cadastrar_acesso", autenticaMiddleware(["Adm", "Vendedor", "Comprador"]), criarAcesso);
rotas.get("/buscar_acessos", autenticaMiddleware(["Adm", "Comprador"]), pegarAcessos);

//LOJA
rotas.post("/cadastrar_loja",autenticaMiddleware(["Adm", "Vendedor"]), criarLoja);
rotas.get("/buscar_lojas",autenticaMiddleware(["Adm", "Vendedor", "Comprador"]), pegarLojas);
