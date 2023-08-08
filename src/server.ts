import express from 'express'

const app = express();

app.get("/", (req,res)=>{
    res.json({message: "bem-vindo"})
})

app.listen(1234, ()=>{
    console.log("servidor rodando!");
})