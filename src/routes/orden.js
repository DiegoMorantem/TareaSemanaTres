const express = require('express');
const router = express.Router();
const { consultarOrden, crearOrden } = require('../controllers/orden.controller');

router.get('/consultar-ordenes/:id', consultarOrden);
router.post('/crear-orden', crearOrden);

module.exports = router;
