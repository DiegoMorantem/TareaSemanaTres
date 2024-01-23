const pool = require('../database/db');
const bcrypt = require('bcrypt');

const getUsuarios = async (req, res) => {
    try {
        const response = await pool.query('SELECT id, nombre, email, created_at, updated_at FROM usuario');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
};

const getUsuarioById = async (req, res) => {
    const userId = req.params.id;

    try {
        const response = await pool.query('SELECT id, nombre, email, created_at, updated_at FROM usuario WHERE id = $1', [userId]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
};

const createUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Generar el hash de la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario con la contraseña encriptada en la base de datos
        const response = await pool.query('INSERT INTO usuario (nombre, email, password, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, nombre, email, created_at, updated_at', [nombre, email, hashedPassword]);

        console.log('Usuario creado:', response.rows[0]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send('Error al crear usuario');
    }
};

const updateUsuario = async (req, res) => {
    const userId = req.params.id;
    const { nombre, email, password } = req.body;

    try {
        // Si deseas actualizar la contraseña también, genera el nuevo hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await pool.query('UPDATE usuario SET nombre = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, nombre, email, created_at, updated_at', [
            nombre,
            email,
            hashedPassword,
            userId
        ]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: `No se encontró un usuario con el ID ${userId}` });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const deleteUsuario = async (req, res) => {
    const userId = req.params.id;

    try {
        const response = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING id, nombre, email, created_at, updated_at', [userId]);

        if (response.rows.length === 0) {
            res.status(404).json({ message: `No se encontró un usuario con el ID ${userId}` });
        } else {
            res.status(200).json({ message: `Usuario con ID ${userId} eliminado`, deletedUser: response.rows[0] });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

const getUsuariosByRol = async (req, res) => {
    const rol_id = req.params.rol_id;

    try {
        const response = await pool.query('SELECT usuario.* FROM usuario JOIN usuario_rol ON usuario.id = usuario_rol.usuario_id WHERE usuario_rol.rol_id = $1', [rol_id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener usuarios por rol:', error);
        res.status(500).send('Error al obtener usuarios por rol');
    }
};

module.exports = {
    getUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    getUsuariosByRol
};
