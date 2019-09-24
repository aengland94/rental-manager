const { Pool } = require('pg');
const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true
});

module.exports.query1 = async (text) => {
   return await pool.query(text);
}

module.exports.query2 = async (text, params) => {
   return await pool.query(text, params);
}