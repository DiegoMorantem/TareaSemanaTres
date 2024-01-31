const express = require('express');
const router = express.Router();
const { listarOrdenes, crearOrden } = require('../controllers/orden.controller');

router.get('/listar-ordenes', listarOrdenes);
router.post('/crear-orden', crearOrden);

module.exports = router;
