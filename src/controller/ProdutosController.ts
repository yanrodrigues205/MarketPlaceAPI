import { Request , Response } from "express";
import { prisma } from "../database/prisma";

export const criarProduto = async (req: Request, res: Response) => {
    const { nome, preco, quantidade, lojaID } = req.body;


    if(!nome  || !preco  || !quantidade || !lojaID)
    {
        return res.status(422).json({ mensagem: "Para cadastrar um produto preencha todos os campos!"});
    }
    else
    {
        const produto = await prisma.produtos.create({
            data: { nome , preco, quantidade, Loja:{
                connect:{
                    id: lojaID
                }
            } }
        });
        return res.json(produto);
    }
};


export const pegarProdutos = async(req: Request, res: Response) => {

    const produtos = await prisma.produtos.findMany();

    return res.json(produtos);

};