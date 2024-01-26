const { Router } = require('express');
const router = Router();

const { getBodega, getBodegaById, createBodega, updateBodega, deleteBodega } = require('../controllers/bodega.controller')

router.get('/bodega', getBodega);
router.get('/bodega/:id', getBodegaById);
router.post('/bodega', createBodega);
router.put('/bodega/:id', updateBodega);
router.delete('/bodega/:id', deleteBodega);

module.exports = router;