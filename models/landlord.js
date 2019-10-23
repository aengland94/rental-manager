// Landlord model
const model = require('./model');

module.exports.getAllLandlordsBasic = async () => {
   const queryString = 'SELECT id, first_name, last_name, email FROM landlords';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllLandlordsSafe = async () => {
   const queryString = 'SELECT id, first_name, last_name, email, created_on, ' + 
      'created_by, updated_on, updated_by FROM landlords';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.create = async (first_name, last_name, email, cb) => {
   const text = 'INSERT INTO users (first_name, last_name, email, ' +
      'created_by) VALUES ($1, $2, $3, $4)';
   const values = [ first_name, last_name, email, cb ];

   await model.query2(text, values);
}