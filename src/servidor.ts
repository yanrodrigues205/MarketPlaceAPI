import express from 'express'
import { rotas } from './rotas';

const app = express();

app.use(express.json());
app.use(rotas);

app.listen(1234, ()=>{
    console.log("servidor rodando!");
})