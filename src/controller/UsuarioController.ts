import { Request, Response } from "express"
import { prisma } from "../database/prisma";

export const criarUsuario = async(req: Request, res: Response) =>{
    const { nome, email, senha, acessoNome } = req.body;

    if(!nome || !email || !senha || !acessoNome)
    {
        return res.status(422).json({ mensagem: "Para cadastrar um produto preencha todos os campos!"});
    }
    else
    {
        

        const usuario = await prisma.usuario.create({
            data: {nome, email, senha, Acesso: {
                connect: {
                    nome: acessoNome //RELACIONA NOME DE ACESSO AO ID DO ACESSO CORRESPONDENTE
                }
            }},
        });
    
        return res.json(usuario);
    }
};


export const deletarUsuarios = async (req:Request, res:Response) => {
    await prisma.usuario.deleteMany();

    return res.json({ mensagem: "Todos usuarios foram deletados com sucesso!"});

};