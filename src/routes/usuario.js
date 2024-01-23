const { Router } = require('express');
const router = Router();

const {
    getUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    getUsuariosByRol
} = require('../controllers/usuario.controller');


// Rutas para operaciones CRUD de usuarios
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);
router.get('/usuarios/rol/:rol_id', getUsuariosByRol);

module.exports = router;
