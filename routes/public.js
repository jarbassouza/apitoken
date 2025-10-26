// Rotas Públicas


import express from 'express';

import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = express.Router();

// Rota de Cadastros
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hasPassword
      },
    });

    res.status(201).json(userDB);

  } catch (error) {
    res.status(500).json({ message: "Erro No Servidor" });
  }
});
  
// lOGIN

router.post('/login', async(req, res) =>{
  try {
    
    const userInfo = req.body
    // Busca o usuario no banco de dados
    const user = await prisma.user.findUnique({
      where: {email: userInfo.email},
    })
   
    // Verificar se o usuario esta cadastrado no banco de dados
    if(!user){
      return res.status(404).json({message: "Usuario Não Encontrado"})
    }
    // Compara a senha digitada com a do banco de dados
    const isMatch = await bcrypt.compare(userInfo.password, user.password)

    if(!isMatch){
      return res.status(400).json({message: "Senha Inválida"})
    }

    // Gera o tokem JWT

    

    res.status(200).json(user)  

  } catch (error) {
    res.status(500).json({ message: "Erro No Servidor" })
  }

})

export default router;

