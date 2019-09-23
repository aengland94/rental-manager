// User model
const pool = require('./model');

module.exports.getAllUsers = async () => {
   const client = await pool.connect();
   const result = await client.query('SELECT * FROM users');
   client.release();

   return (result) ? result.rows : null;
}

module.exports.getDbTest = async () => {
   const client = await pool.connect();
   const result = await client.query('SELECT * FROM test_table');   
   client.release();

   return (result) ? result.rows : null;
}