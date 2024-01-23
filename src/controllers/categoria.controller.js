// categoria.controller.js
const pool = require('../database/db');

const getCategoria = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM categoria');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).send('Error al obtener categorías');
    }
};

const getCategoriaById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM categoria WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        res.status(500).send('Error al obtener categoría por ID');
    }
};

const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const response = await pool.query('INSERT INTO categoria (nombre, descripcion, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', [nombre, descripcion]);

        console.log('Categoría creada:', response.rows[0]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).send('Error al crear categoría');
    }
};

const updateCategoria = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    try {
        const response = await pool.query('UPDATE categoria SET nombre = $1, descripcion = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *', [
            nombre,
            descripcion,
            id 
        ]);

        if (response.rows.length === 0) {
            // No se encontró una categoría con el ID especificado
            res.status(404).json({ message: `No se encontró una categoría con el ID ${id}` });
        } else {
            console.log('Categoría actualizada:', response.rows[0]);
            res.json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).send('Error al actualizar categoría');
    }
};

const deleteCategoria = async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await pool.query('DELETE FROM categoria WHERE id = $1 RETURNING *', [id]);

        if (response.rows.length === 0) {
            // No se encontró una categoría con el ID especificado
            res.status(404).json({ message: `No se encontró una categoría con el ID ${id}` });
        } else {
            console.log(`Categoría ${id} eliminada`);
            res.json({
                message: `Categoría ${id} eliminada`,
                deletedCategoria: response.rows[0]
            });
        }
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).send('Error al eliminar categoría');
    }
};

module.exports = {
    getCategoria,
    getCategoriaById,
    createCategoria,
    deleteCategoria,
    updateCategoria
};
