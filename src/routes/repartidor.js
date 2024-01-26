const { Router } = require('express');
const router = Router();

const { getRepartidor, getRepartidorById, createRepartidor, updateRepartidor, deleteRepartidor } = require('../controllers/repartidor.controller')

router.get('/repartidor', getRepartidor);
router.get('/repartidor/:id', getRepartidorById);
router.post('/repartidor', createRepartidor);
router.put('/repartidor/:id', updateRepartidor);
router.delete('/repartidor/:id', deleteRepartidor);

module.exports = router;