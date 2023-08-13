import express from 'express'
import { rotas } from './rotas';

const path = require("path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(rotas);

app.listen(1234, ()=>{
    console.log("servidor rodando!");
})