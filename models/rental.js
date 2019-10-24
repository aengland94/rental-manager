// Rental model
const model = require('./model');

module.exports.getAllRentalsBasic = async () => {
   const queryString = 'SELECT id, display_name, vacant FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllRentalsSafe = async () => {
   const queryString = 'SELECT id, unit_id, display_name, apt_number, ' + 
      'vacant, lease_expires_on, note, created_on, created_by, updated_on, ' + 
      'updated_by FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, display_name FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.create = async (display_name, apt_number, description, rate, unit_id, cb) => {
   const text = 'INSERT INTO users (display_name, apt_number, description, rate, ' +
      'unit_id, created_by) VALUES ($1, $2, $3, $4, $5, $6)';
   const values = [ display_name, apt_number, description, rate, unit_id, cb ];

   await model.query2(text, values);
}