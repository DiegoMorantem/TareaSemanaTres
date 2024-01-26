const pool = require('../database/db');

const getRepartidor = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM repartidor');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener repartidores:', error);
        res.status(500).send('Error al obtener repartidores');
    }
};

const getRepartidorById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM repartidor WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener repartidor por ID:', error);
        res.status(500).send('Error al obtener repartidor por ID');
    }
};

const createRepartidor = async (req, res) => {
    const { nombres, apellidos, nro_documento, telefono} = req.body;

    try {
        const response = await pool.query('INSERT INTO repartidor (nombres, apellidos, nro_documento, telefono, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', [nombres, apellidos, nro_documento, telefono]);

        console.log('Repartidor creado:', response.rows[0]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear repartidor:', error);
        res.status(500).send('Error al crear repartidor');
    }
};

const updateRepartidor = async (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, nro_documento, telefono } = req.body;

    try {
        const response = await pool.query('UPDATE repartidor SET nombres = $1, apellidos = $2, nro_documento = $3, telefono = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *', [
            nombres,
            apellidos,
            nro_documento,
            telefono,
            id 
        ]);

        if (response.rows.length === 0) {
            // No se encontró un repartidor con el ID especificado
            res.status(404).json({ message: `No se encontró un repartidor con el ID ${id}` });
        } else {
            console.log('Repartidor actualizado:', response.rows[0]);
            res.json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar repartidor:', error);
        res.status(500).send('Error al actualizar repartidor');
    }
};

const deleteRepartidor = async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await pool.query('DELETE FROM repartidor WHERE id = $1 RETURNING *', [id]);

        if (response.rows.length === 0) {
            // No se encontró un repartidor con el ID especificado
            res.status(404).json({ message: `No se encontró un repartidor con el ID ${id}` });
        } else {
            console.log(`Repartidor ${id} eliminado`);
            res.json({
                message: `Repartidor ${id} eliminado`,
                deletedRepartidor: response.rows[0]
            });
        }
    } catch (error) {
        console.error('Error al eliminar repartidor:', error);
        res.status(500).send('Error al eliminar repartidor');
    }
};

module.exports = {
    getRepartidor,
    getRepartidorById,
    createRepartidor,
    updateRepartidor,
    deleteRepartidor
};
