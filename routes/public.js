
// Rotas Públicas

import express from "express";

const router = express.Router();

// Rota de Cadastros
router.post("/cadastro", (req, res) => {
  const user = req.body;
  res.status(201).json(user);
});

export default router
