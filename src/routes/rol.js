const { Router } = require('express');
const router = Router();

const {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
} = require('../controllers/rol.controller');

router.get('/roles', getRoles);
router.get('/roles/:id', getRolById);       
router.post('/roles', createRol);            
router.put('/roles/:id', updateRol);         
router.delete('/roles/:id', deleteRol);      

module.exports = router;

