const express = require('express');
const router = express.Router()
const { Clientes } = require('../models')

router.get("/", async (req, res) => {
  const listClientes = await Clientes.findAll();
  res.json(listClientes);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cliente = await Clientes.findByPk(id);
  res.json(cliente);
});

router.post("/", async (req, res) => {
  const cliente = req.body
  await Clientes.create(cliente);
  res.json(cliente);
});

module.exports = router