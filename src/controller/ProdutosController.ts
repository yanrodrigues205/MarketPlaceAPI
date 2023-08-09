import { Request , Response } from "express";
import { prisma } from "../database/prisma";

export const criarProduto = async (req: Request, res: Response) => {
    const { nome, preco, quantidade } = req.body;


    if(!nome  || !preco  || !quantidade)
    {
        return res.status(422).json({ mensagem: "Para cadastrar um produto preencha todos os campos!"});
    }
    else
    {
        const produto = await prisma.produtos.create({
            data: { nome , preco, quantidade }
        });

        return res.json(produto);
    
    }
    

}