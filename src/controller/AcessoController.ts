import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarAcesso = async( req: Request, res: Response) => {
    const { nome } = req.body;

    if(!nome)
    {
        return res.status(422).json({ mensagem : "Para cadastrar um acesso preencha todos os campos!"});
    }
    else
    {
        const acesso = await prisma.acesso.create({
            data: { nome },
        })
    
        return res.json(acesso);
    }

}


export const pegarAcessos = async (req: Request, res: Response) => {

    const acessos = await prisma.acesso.findMany();

    return res.json(acessos);
}