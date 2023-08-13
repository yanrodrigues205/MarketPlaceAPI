import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const logar = async (req: Request, res: Response ) => {
    try
    {
        const {email, senha } = req.body;

       
        const usuario = await prisma.usuario.findUnique({
            where:{
                email 
            },
            
            include:{
                usuarioAcesso:{
                    select:{
                        Acesso:{
                            select:{
                                nome: true
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

        const token = sign({
            usuario: usuario.id, acessos: usuario.usuarioAcesso.map(role => role.Acesso?.nome) //PASSANDO O ID DO USUARIO E O SEU TIPO DE ACESSO!
        }, SECRET_KEY, {
            algorithm: "HS256", 
            expiresIn: "24h"
        });
        
        return res.status(200).json({ mensagem: "Voce foi autenticado! Expiracao em 24hrs.", token } );

    }
    catch (err)
    {
        return res.status(500).json({ mensagem: "Erro interno nos servidores!", err});
    }
}