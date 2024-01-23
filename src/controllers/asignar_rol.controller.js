const pool = require('../database/db');

const listarAsignacionesRol = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuario_rol');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al listar asignaciones de roles:', error);
        res.status(500).json({ error: 'Error al listar asignaciones de roles' });
    }
};

const asignarRolAUsuario = async (req, res) => {
    const { usuario_id, rol_id } = req.body;

    try {
        await pool.query('INSERT INTO usuario_rol (usuario_id, rol_id) VALUES ($1, $2)', [usuario_id, rol_id]);
        res.status(200).json({ message: 'Rol asignado exitosamente' });
    } catch (error) {
        console.error('Error al asignar rol a usuario:', error);
        res.status(500).json({ error: 'Error al asignar rol a usuario' });
    }
};

const actualizarAsignacionRol = async (req, res) => {
    const { usuario_id, rol_id } = req.body;

    try {
        await pool.query('UPDATE usuario_rol SET rol_id = $1 WHERE usuario_id = $2', [rol_id, usuario_id]);
        res.status(200).json({ message: 'Asignación de rol actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar asignación de rol:', error);
        res.status(500).json({ error: 'Error al actualizar asignación de rol' });
    }
};

const eliminarAsignacionRol = async (req, res) => {
    const { usuario_id, rol_id } = req.body;

    try {
        await pool.query('DELETE FROM usuario_rol WHERE usuario_id = $1 AND rol_id = $2', [usuario_id, rol_id]);
        res.status(200).json({ message: 'Asignación de rol eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar asignación de rol:', error);
        res.status  (500).json({ error: 'Error al eliminar asignación de rol' });
    }
};

module.exports = {
    listarAsignacionesRol,
    asignarRolAUsuario,
    actualizarAsignacionRol,
    eliminarAsignacionRol
};
