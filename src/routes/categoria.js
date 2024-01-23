const { Router } = require('express');
const router = Router();

const { getCategoria, createCategoria, getCategoriaById, deleteCategoria, updateCategoria } = require('../controllers/categoria.controller')

router.get('/categoria', getCategoria);
router.get('/categoria/:id', getCategoriaById);
router.post('/categoria', createCategoria);
router.delete('/categoria/:id', deleteCategoria);
router.put('/categoria/:id', updateCategoria);

module.exports = router;