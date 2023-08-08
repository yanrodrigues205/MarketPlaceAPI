import { Router } from "express";
import { criarUsuario } from "./controller/UsuarioController";

export const rotas = Router();

rotas.post("/usuario", criarUsuario);