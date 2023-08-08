import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const criarUsuario = async(req: Request, res: Response) =>{
    const { nome, email, senha } = req.body;

    const usuario = await prisma.usuario.create({
        data: {nome, email, senha}
    });

    return res.json(usuario);

}