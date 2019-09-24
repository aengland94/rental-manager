// User model
const model = require('./model');

module.exports.getAllUsers = async () => {
   // const client = await pool.connect();
   // const result = await client.query('SELECT * FROM users');
   // client.release();

   const result = await model.query1('SELECT * FROM users');

   return (result) ? result.rows : null;
}

module.exports.getDbTest = async () => {
   const result = await model.query1('SELECT * FROM test_table');

   return (result) ? result.rows : null;
}