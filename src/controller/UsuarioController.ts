import { Request, Response } from "express"
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const criarUsuario = async(req: Request, res: Response) =>{
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const acessoNome = req.body.acessoNome;

    if(!nome || !email || !senha || !acessoNome)
    {
        return res.status(422).json({ mensagem: "Para cadastrar um produto preencha todos os campos!"});
    }
    else
    {

        const verificaEmail = await prisma.usuario.findUnique({
            where: {
                email  //VERIFICA A EXISTENCIA DO EMAIL NO SISTEMA, COM O WHERE DO PRISMA
            }
        });

        

        if(!verificaEmail)
        {
            const hashSenha = await hash(senha, 8); //CRIPTOGRAFANDO SENHA COM MAIS 8 CARACTERES

            const usuario = await prisma.usuario.create({
                data: {
                    nome, 
                    email, 
                    senha: hashSenha, 
                    usuarioAcesso:{
                        create: {   //RELACIONANDO TABELA USUARIO_ACESSO COM A TABELA ACESSO
                            Acesso: { 
                                connect:{
                                    nome: acessoNome
                                }
                            }
                        }
                    }
                },
                select:{
                    id: true,
                    nome: true,
                    email: true,
                    senha: true,
                    usuarioAcesso:{
                        select:{
                            Acesso:{
                                select:{
                                    id: true,
                                    nome: true,
                                }
                            }
                        }
                    },
                    criacao_us: true,
                    atualizacao_us: true
                }
            });
        
            return res.json(usuario);
        }
        else
        {
            return res.status(422).json({
                message: "Ja existe esse endereco de email no sistema!"
            })
        }


        
    }
};


 export const deletarUsuarios = async (req:Request, res:Response) => {
     await prisma.usuario.deleteMany();

     return res.json({ mensagem: "Todos usuarios foram deletados com sucesso!"});

 };


 export const pegarUsuarios = async (req: Request, res: Response) => {
    const usuarios  = await prisma.usuario.findMany();
    return res.json(usuarios);
 }