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

module.exports.create = async (first_name, last_name, email, username, password) => {
   const text = 'INSERT INTO users (first_name, last_name, email, username, ' +
      'password, created_by) VALUES ($1, $2, $3, $4, $5, $6)';
   // TODO: have created_by be the user currently signed in
   const values = [ first_name, last_name, email, username, password, 1 ];

   await model.query2(text, values);
}