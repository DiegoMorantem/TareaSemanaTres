// controllers/ordenController.js
const pool = require('../database/db');

const consultarOrden = async (req, res) => {
  const { id } = req.params; // Obtén el ID del parámetro de la URL

  try {
    const resultado = await pool.query(
      `SELECT
         orden.id AS orden_id,
         orden.producto_id,
         orden.cantidad,
         orden.bodega_id,
         bodega.nombre AS nombre_bodega,
         bodega.direccion AS direccion_bodega,
         bodega.telefono AS telefono_bodega,
         orden.repartidor_id,
         repartidor.nombres AS nombres_repartidor,
         repartidor.apellidos AS apellidos_repartidor,
         repartidor.nro_documento AS nro_documento_repartidor,
         repartidor.telefono AS telefono_repartidor,
         orden.cliente_id,
         cliente.nombres AS nombres_cliente,
         cliente.apellidos AS apellidos_cliente,
         cliente.nro_documento AS nro_documento_cliente,
         cliente.telefono AS telefono_cliente,
         cliente.direccion AS direccion_cliente,
         orden.estado_entrega,
         orden.created_at,
         orden.updated_at
       FROM
         orden
         INNER JOIN bodega ON orden.bodega_id = bodega.id
         INNER JOIN repartidor ON orden.repartidor_id = repartidor.id
         INNER JOIN cliente ON orden.cliente_id = cliente.id
       WHERE
         orden.id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la orden.' });
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
  consultarOrden,
  crearOrden
};
