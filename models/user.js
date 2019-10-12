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