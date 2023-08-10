import {  Request, Response } from "express"; 
import { prisma } from "../database/prisma";

export const criarLoja = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const { usuarioID } = req.params;

    const verificaID = await prisma.usuario.findUnique({
        where: {
            id: usuarioID
        }
    })

    if(!verificaID)
    {
        return res.status(422).json({ mensagem: "Usuario nao identificado!"});
    }
    else
    {   
        if(!nome)
        {
            return res.status(422).json({ mensagem: "Preencha todos os campos para criar uma loja!"});
        }
        else
        {
            const loja = await prisma.loja.create({
                data: {
                    nome,
                    Usuario: {
                        connect: {
                            id: usuarioID
                        }
                    }
                }
                   
            });
        }
        
    }
    

};