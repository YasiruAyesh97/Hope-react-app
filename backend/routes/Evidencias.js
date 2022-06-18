const express = require('express');
const router = express.Router()
const { Evidencias } = require('../models')

router.get("/", async (req, res) => {
  const listEvidencias = await Evidencias.findAll();
  res.json(listEvidencias);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const evidencia = await Evidencias.findByPk(id);
  res.json(evidencia);
});

router.post("/", async (req, res) => {
  const evidencia = req.body
  await Evidencias.create(evidencia);
  res.json(evidencia);
});

module.exports = router