const { Router } = require('express');
const router = Router();

const {
    listarAsignacionesRol,
    asignarRolAUsuario,
    actualizarAsignacionRol,
    eliminarAsignacionRol
} = require('../controllers/asignar_rol.controller');

// Rutas para asignar, actualizar y eliminar roles
router.get('/asignar-rol', listarAsignacionesRol);
router.post('/asignar-rol', asignarRolAUsuario);
router.put('/asignar-rol', actualizarAsignacionRol);
router.delete('/asignar-rol', eliminarAsignacionRol);

module.exports = router;
