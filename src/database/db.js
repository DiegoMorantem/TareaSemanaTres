// db.js
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '793733',
    database: 'tienda',
    port: '5432'
});

module.exports = pool;