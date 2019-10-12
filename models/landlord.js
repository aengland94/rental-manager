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