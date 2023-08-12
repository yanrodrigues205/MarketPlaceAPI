declare namespace Express
{
    interface Request   //ADICIONANDO MAIS UMA TIPAGEM AO TYPESCRIPT
    {
        usuario:
        {
            id: string;
        }
    }
}