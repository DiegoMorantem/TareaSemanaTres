const { Router } = require('express');
const router = Router();

const { getProducto, createProducto, getProductoById, deleteProducto, updateProducto, getProductoByCategoria } = require('../controllers/producto.controller')

router.get('/producto', getProducto);
router.get('/producto/:id', getProductoById);
router.post('/producto', createProducto);
router.delete('/producto/:id', deleteProducto);
router.put('/producto/:id', updateProducto);
router.get('/productos/categoria/:categoria_id', getProductoByCategoria);


module.exports = router;