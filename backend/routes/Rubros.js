const express = require('express');
const router = express.Router()
const { Rubros } = require('../models')

router.get("/", async (req, res) => {
  const listRubros = await Rubros.findAll();
  res.json(listRubros);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const rubro = await Rubros.findByPk(id);
  res.json(rubro);
});

router.get("/:clienteId", async (req, res) => {
  const id = req.params.clienteId;
  const rubros = await Rubros.findAll({ where: { ClienteId: clienteId } });
  res.json(rubros);
});

router.post("/", async (req, res) => {
  const rubro = req.body
  await Rubros.create(rubro);
  res.json(rubro);
});

module.exports = router