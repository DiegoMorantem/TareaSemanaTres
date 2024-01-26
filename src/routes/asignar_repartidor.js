const { Router } = require('express');
const router = Router();

const { asignarRepartidorABodega, listarAsignaciones } = require('../controllers/asignar_repartidor.controller');

router.get('/asignar-repartidor', listarAsignaciones );
router.post('/asignar-repartidor', asignarRepartidorABodega);

module.exports = router;
