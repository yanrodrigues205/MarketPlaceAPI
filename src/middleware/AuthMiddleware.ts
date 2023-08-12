import { NextFunction, Request, Response } from "express";

export function autenticaMiddleware(permissoes?: string[] ){  //CRIANDO ARRAY DE PERMISSOES PARA FAZER AUTENTICACAO
    return(req: Request, res: Response, next: NextFunction) => {
        const autenticaRequisicao = req.headers.authorization;  //PEGANDO DADOS DA AUTENTICACAO , VINDOS DO HEADER DA REQUISICAO

        if(!autenticaRequisicao || !autenticaRequisicao.startsWith("Bearer "))
        {
            return res.status(401).json({ mensagem: "Token nao enviado, ou nao esta com Bearer!"});
        }
        else
        {
            const token = autenticaRequisicao.substring(7); // `SPLIT DA PALAVRA BEARER PARA PEGAR SOMENTE O TOKEN
            
        }
    }
}