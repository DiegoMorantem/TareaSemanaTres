// controllers/asignarRepartidorController.js
const pool = require('../database/db'); // Importa tu conexión a la base de datos

const listarAsignaciones = async (req, res) => {
    try {
      const asignaciones = await pool.query('SELECT * FROM bodega_repartidor');
      res.json(asignaciones.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las asignaciones.' });
    }
  };

  const asignarRepartidorABodega = async (req, res) => {
    try {
      const { repartidor_id, bodega_id } = req.body;
  
      // Verifica si la bodega ya tiene 5 repartidores asignados
      const repartidoresEnBodega = await pool.query('SELECT COUNT(*) FROM bodega_repartidor WHERE bodega_id = $1', [bodega_id]);
      if (repartidoresEnBodega.rows[0].count >= 5) {
        return res.status(400).json({ error: 'La bodega ya tiene el máximo de repartidores asignados.' });
      }
  
      // Inserta el nuevo registro en la tabla de relación
      await pool.query('INSERT INTO bodega_repartidor (bodega_id, repartidor_id) VALUES ($1, $2)', [bodega_id, repartidor_id]);
  
      res.json({ message: 'Repartidor asignado a la bodega exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al asignar repartidor a la bodega.' });
    }
  };
  
  module.exports = {
    asignarRepartidorABodega,
    listarAsignaciones
  };

