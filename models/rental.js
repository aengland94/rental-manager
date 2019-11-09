// Rental model
const model = require('./model');

module.exports.getAllRentalsBasic = async () => {
   const queryString = 'SELECT id, display_name, vacant FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllRentalsSafe = async () => {
   const queryString = 'SELECT id, unit_id, display_name, apt_number, ' + 
      'vacant, lease_expires_on, description, rate, note, created_on, ' + 
      'created_by, updated_on, updated_by FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllSafe = async (id) => {
   const text = 'SELECT id, unit_id, display_name, apt_number, ' + 
      'vacant, lease_expires_on, description, rate, note, created_on, ' + 
      'created_by, updated_on, updated_by FROM rentals WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, display_name FROM rentals';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyInfo = async (id) => {
   const text = 'SELECT id, display_name FROM rentals WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.create = async (display_name, apt_number, description, rate, unit_id, cb) => {
   const text = 'INSERT INTO rentals (display_name, apt_number, description, rate, ' +
      'unit_id, created_by) VALUES ($1, $2, $3, $4, $5, $6)';
   const values = [ display_name, apt_number, description, rate, unit_id, cb ];

   await model.query2(text, values);
}

module.exports.update = async (display_name, apt_number, description, rate, unit_id, ub, id) => {
   const text = 'UPDATE rentals SET display_name = $1, apt_number = $2, description = $3, ' +
      'rate = $4, unit_id = $5, updated_by = $6, updated_on = CURRENT_DATE ' + 
      'WHERE id = $7';
   const values = [ display_name, apt_number, description, rate, unit_id, ub, id ];

   await model.query2(text, values);
}