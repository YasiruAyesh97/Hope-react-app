const express = require('express');
const router = express.Router()
const { Competencia } = require('../models')

router.get("/", async (req, res) => {
  const listCompetencias = await Competencia.findAll();
  res.json(listCompetencias);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const competencia = await Competencia.findByPk(id);
  res.json(competencia);
});

router.post("/", async (req, res) => {
  const competencia = req.body
  await Competencia.create(competencia);
  res.json(competencia);
});

module.exports = router