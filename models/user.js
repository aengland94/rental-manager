// User model
const model = require('./model');

module.exports.getAllUsersBasic = async () => {
   const queryString = 'SELECT id, username, first_name, last_name, email ' + 
      'FROM users';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllUsersSafe = async () => {
   const queryString = 'SELECT id, username, first_name, last_name, email, ' + 
      'created_on, created_by, updated_on, updated_by FROM users';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, username FROM users';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.create = async (first_name, last_name, email, username, cb) => {
   const text = 'INSERT INTO users (first_name, last_name, email, username, ' +
      'created_by) VALUES ($1, $2, $3, $4, $5)';
   // TODO: hash password
   const values = [ first_name, last_name, email, username, cb ];

   await model.query2(text, values);
}