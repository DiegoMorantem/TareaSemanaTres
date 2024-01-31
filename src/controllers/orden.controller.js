// controllers/ordenController.js
const pool = require('../database/db');

const listarOrdenes = async (req, res) => {
  try {
    const ordenes = await pool.query('SELECT * FROM orden');
    res.json(ordenes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las órdenes.' });
  }
};

const crearOrden = async (req, res) => {
  try {
    const { producto_id, cantidad, bodega_id, repartidor_id, cliente_id, estado_entrega } = req.body;

    const nuevaOrden = await pool.query(
      'INSERT INTO orden (producto_id, cantidad, bodega_id, repartidor_id, cliente_id, estado_entrega) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [producto_id, cantidad, bodega_id, repartidor_id, cliente_id, estado_entrega]
    );

    res.status(201).json(nuevaOrden.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la orden.' });
  }
};

module.exports = {
  listarOrdenes,
  crearOrden
};
