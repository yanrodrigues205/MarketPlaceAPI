import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/prisma";


interface DecodificaToken{
    usuarioID: string;
}

export function autenticaMiddleware(permissoes?: string[] ){  //CRIANDO ARRAY DE PERMISSOES PARA FAZER AUTENTICACAO
    return async(req: Request, res: Response, next: NextFunction) => {
        const autenticaRequisicao = req.headers.authorization;  //PEGANDO DADOS DA AUTENTICACAO , VINDOS DO HEADER DA REQUISICAO

        if(!autenticaRequisicao || !autenticaRequisicao.startsWith("Bearer "))
        {
            return res.status(401).json({ mensagem: "Token nao enviado, ou nao esta com Bearer!"});
        }
        else
        {
            const token = autenticaRequisicao.substring(7); // `SPLIT DA PALAVRA BEARER PARA PEGAR SOMENTE O TOKEN

            try
            {
                const SECRET_KEY = process.env.SECRET_KEY;
                if(!SECRET_KEY)
                {
                    throw new Error("Chave da API Inexistente!");                  
                }
                const decodificaToken = verify(token, SECRET_KEY) as DecodificaToken;
                req.usuario = { id: decodificaToken.usuarioID };

                if(permissoes)
                {
                    const usuario = await prisma.usuario.findUnique({
                        where: {
                            id: decodificaToken.usuarioID
                        },
                        include: {
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

                    const usuarioPermissoes = usuario?.usuarioAcesso.map((nome)=>  nome.Acesso?.nome ) ?? [] ; //PEGA O NOME DAS PERMISSOES, TRADUZINDO, PEGA O NOME DOS ACESSOS DO USUARIO 
                    const temPermissoes =permissoes.some((permissao) => usuarioPermissoes.includes((permissao))); // COMPARA AS PERMISSOES E DEFINE SE ESTA CORRETO O ACESSO OU NAO

                    
                    
                    if(!temPermissoes){
                        return res.status(403).json({ mensagem: "Permissao Negada!"});
                    }
                }

                return next();
            }
            catch(erro)
            {
                return res.status(401).json({ mensagem: "Token invalido!" });
            }
        }
    }
}