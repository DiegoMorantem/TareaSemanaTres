const pool = require('../database/db');

const getBodega = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM bodega');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener bodegas:', error);
        res.status(500).send('Error al obtener bodegas');
    }
};

const getBodegaById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM bodega WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener bodega por ID:', error);
        res.status(500).send('Error al obtener bodega por ID');
    }
};

const createBodega = async (req, res) => {
    const { nombre, direccion, telefono} = req.body;

    try {
        const response = await pool.query('INSERT INTO bodega (nombre, direccion, telefono, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', [nombre, direccion, telefono]);

        console.log('Bodega creada:', response.rows[0]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear bodega:', error);
        res.status(500).send('Error al crear bodega');
    }
};

const updateBodega = async (req, res) => {
    const id = req.params.id;
    const { nombre, direccion, telefono } = req.body;

    try {
        const response = await pool.query('UPDATE bodega SET nombre = $1, direccion = $2, telefono = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *', [
            nombre,
            direccion,
            telefono,
            id 
        ]);

        if (response.rows.length === 0) {
            // No se encontró una bodega con el ID especificado
            res.status(404).json({ message: `No se encontró una bodega con el ID ${id}` });
        } else {
            console.log('Bodega actualizada:', response.rows[0]);
            res.json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar bodega:', error);
        res.status(500).send('Error al actualizar bodega');
    }
};

const deleteBodega = async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await pool.query('DELETE FROM bodega WHERE id = $1 RETURNING *', [id]);

        if (response.rows.length === 0) {
            // No se encontró una bodega con el ID especificado
            res.status(404).json({ message: `No se encontró una bodega con el ID ${id}` });
        } else {
            console.log(`Bodega ${id} eliminada`);
            res.json({
                message: `Bodega ${id} eliminada`,
                deletedBodega: response.rows[0]
            });
        }
    } catch (error) {
        console.error('Error al eliminar bodega:', error);
        res.status(500).send('Error al eliminar bodega');
    }
};

module.exports = {
    getBodega,
    getBodegaById,
    createBodega,
    updateBodega,
    deleteBodega
};
