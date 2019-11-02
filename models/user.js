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

module.exports.getAllSafe = async (id) => {
   const text = 'SELECT id, username, first_name, last_name, email, ' + 
      'created_on, created_by, updated_on, updated_by FROM users ' +
      'WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, username FROM users';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyInfo = async (id) => {
   const text = 'SELECT id, username FROM users WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.create = async (first_name, last_name, email, username, cb) => {
   const text = 'INSERT INTO users (first_name, last_name, email, username, ' +
      'created_by) VALUES ($1, $2, $3, $4, $5)';
   const values = [ first_name, last_name, email, username, cb ];

   await model.query2(text, values);
}

module.exports.update = async (first_name, last_name, email, username, ub, id) => {
   const text = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, ' +
      'username = $4, updated_by = $5, updated_on = CURRENT_DATE ' + 
      'WHERE id = $6';
   const values = [ first_name, last_name, email, username, ub, id ];

   await model.query2(text, values);
}