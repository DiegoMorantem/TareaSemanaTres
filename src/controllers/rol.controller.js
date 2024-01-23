const pool = require('../database/db');

const getRoles = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM rol');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).send('Error al obtener roles');
    }
};

const getRolById = async (req, res) => {
    const rolId = req.params.id;

    try {
        const response = await pool.query('SELECT * FROM rol WHERE id = $1', [rolId]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: 'Rol no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener rol por ID:', error);
        res.status(500).json({ error: 'Error al obtener rol por ID' });
    }
};

const createRol = async (req, res) => {
    const { nombre } = req.body;

    try {
        const response = await pool.query('INSERT INTO rol (nombre) VALUES ($1) RETURNING *', [nombre]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear rol:', error);
        res.status(500).json({ error: 'Error al crear rol' });
    }
};

const updateRol = async (req, res) => {
    const rolId = req.params.id;
    const { nombre } = req.body;

    try {
        const response = await pool.query('UPDATE rol SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, rolId]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: `No se encontró un rol con el ID ${rolId}` });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
};

const deleteRol = async (req, res) => {
    const rolId = req.params.id;

    try {
        const response = await pool.query('DELETE FROM rol WHERE id = $1 RETURNING *', [rolId]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: `No se encontró un rol con el ID ${rolId}` });
        } else {
            res.status(200).json({ message: `Rol con ID ${rolId} eliminado`, deletedRol: response.rows[0] });
        }
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        res.status(500).json({ error: 'Error al eliminar rol' });
    }
};

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};
