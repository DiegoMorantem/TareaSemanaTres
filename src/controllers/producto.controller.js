// index.controller.js
const pool = require('../database/db');

const getProducto = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM producto');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
};

const getProductoById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM producto WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).send('Error al obtener producto por ID');
    }
};

const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, categoria_id } = req.body;

    try {
        const response = await pool.query('INSERT INTO producto (nombre, descripcion, precio, categoria_id, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', [nombre, descripcion, precio, categoria_id]);

        console.log('Producto creado:', response.rows[0]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error al crear producto');
    }
};

const updateProducto = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, categoria_id } = req.body;

    try {
        const response = await pool.query('UPDATE producto SET nombre = $1, descripcion = $2, precio = $3, categoria_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *', [
            nombre,
            descripcion,
            precio,
            categoria_id,
            id 
        ]);

        if (response.rows.length === 0) {
            // No se encontró un producto con el ID especificado
            res.status(404).json({ message: `No se encontró un producto con el ID ${id}` });
        } else {
            console.log('Producto actualizado:', response.rows[0]);
            res.json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
};

const deleteProducto = async (req, res) => {
    const id = req.params.id;
    
    try {
        const response = await pool.query('DELETE FROM producto WHERE id = $1 RETURNING *', [id]);

        if (response.rows.length === 0) {
            // No se encontró un producto con el ID especificado
            res.status(404).json({ message: `No se encontró un producto con el ID ${id}` });
        } else {
            console.log(`Producto ${id} eliminado`);
            res.json({
                message: `Producto ${id} eliminado`,
                deletedProduct: response.rows[0]
            });
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
};

const getProductoByCategoria = async (req, res) => {
    const categoria_id = req.params.categoria_id;

    try {
        const response = await pool.query('SELECT * FROM producto WHERE categoria_id = $1', [categoria_id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).send('Error al obtener productos por categoría');
    }
};

module.exports = {
    getProducto,
    getProductoById,
    createProducto,
    deleteProducto,
    updateProducto,
    getProductoByCategoria
};
