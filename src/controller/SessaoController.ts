import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { json } from "body-parser";
import { compare } from "bcryptjs";

export const logar = async (req: Request, res: Response ) => {
    try
    {
        const {email, senha } = req.body;

       
        const usuario = await prisma.usuario.findMany({
            where:{
                email,  
            },
            include:{
                usuarioAcesso:{
                    select:{
                        Acesso:{
                            select:{
                                nome: true,
                            }
                        }
                    }
                }
            }
        });

        if(!usuario)
        {
            return res.status(400).json({mensagem: "Usuario nao encontrado."})
        }

        const compara_senha = await compare(senha, usuario.senha);

        if(!compara_senha)
        {
            return res.status(400).json({mensagem: "Senha incorreta!"});
        }

        const SECRET_KEY = process.env.SECRET_KEY;

        if(!SECRET_KEY)
        {
            throw new Error("Chave da API Inexistente!");
        }

    }
    catch (err)
    {

    }
}