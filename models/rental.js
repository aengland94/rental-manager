// Rental model
const model = require('./model');

module.exports.getAllRentalsBasic = async () => {
   const queryString = 'SELECT id, display_name, vacant FROM units';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllRentalsSafe = async () => {
   const queryString = 'SELECT id, unit_id, display_name, apt_number, ' + 
      'vacant, lease_expires_on, note, created_on, created_by, updated_on, ' + 
      'updated_by FROM units';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}