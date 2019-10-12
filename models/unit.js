// Unit model
const model = require('./model');

module.exports.getAllUnitsBasic = async () => {
   const queryString = 'SELECT id, street_address, city FROM units';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllUnitsSafe = async () => {
   const queryString = 'SELECT id, landlord_id, street_address, city, state, ' + 
      'zip_code, created_on, created_by, updated_on, updated_by FROM units';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}