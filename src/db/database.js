const mysql = require('mysql2/promise');

// Configuración centralizada esto es solo para el demo, la versión original no tiene conexión directa con la base de datos.
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'SOFTadmin2025',
    database: 'demo'
};

// Valida las credenciales del usuario
async function validarUsuario(username, password) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.execute(
            'SELECT username FROM usuarios WHERE (username = ? OR email = ?) AND password = ? LIMIT 1',
            [username, username, password]
        );

        return {
            success: rows.length > 0,
            user: rows.length > 0 ? rows[0] : null
        };
    } catch (error) {
        console.error("Error en database.js:", error.message);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    validarUsuario
};