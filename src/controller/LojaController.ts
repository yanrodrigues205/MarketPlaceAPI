import {  Request, Response } from "express"; 
import { prisma } from "../database/prisma";

export const criarLoja = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const { usuarioID } = req.params;


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

};