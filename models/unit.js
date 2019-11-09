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

module.exports.getAllSafe = async (id) => {
   const text = 'SELECT id, landlord_id, street_address, city, state, ' + 
      'zip_code, created_on, created_by, updated_on, updated_by FROM units ' + 
      'WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, street_address FROM units';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyInfo = async (id) => {
   const text = 'SELECT id, street_address FROM units WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.create = async (street_address, city, state, zip_code, landlord_id, cb) => {
   const text = 'INSERT INTO units (street_address, city, state, zip_code, ' +
      'landlord_id, created_by) VALUES ($1, $2, $3, $4, $5, $6)';
   const values = [ street_address, city, state, zip_code, landlord_id, cb ];

   await model.query2(text, values);
}

module.exports.update = async (street_address, city, state, zip_code, landlord_id, ub, id) => {
   const text = 'UPDATE units SET street_address = $1, city = $2, state = $3, ' +
      'zip_code = $4, landlord_id = $5, updated_by = $6, updated_on = CURRENT_DATE ' + 
      'WHERE id = $7';
   const values = [ street_address, city, state, zip_code, landlord_id, ub, id ];

   await model.query2(text, values);
}