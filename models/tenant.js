// Tenant model
const model = require('./model');

module.exports.getAllTenantsBasic = async () => {
   const queryString = 'SELECT id, first_name, last_name, email, current ' + 
      'FROM tenants';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllTenantsSafe = async () => {
   const queryString = 'SELECT id, first_name, last_name, email, current, ' + 
      'evicted, rental_id, phone_number, note, created_on, created_by, ' + 
      'updated_on, updated_by FROM tenants';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAllSafe = async (id) => {
   const text = 'SELECT id, first_name, last_name, email, current, ' + 
      'evicted, rental_id, phone_number, note, created_on, created_by, ' + 
      'updated_on, updated_by FROM tenants WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, email FROM tenants';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyInfo = async (id) => {
   const text = 'SELECT id, email FROM tenants WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.create = async (first_name, last_name, email, phone_number, rental_id, cb) => {
   const text = 'INSERT INTO tenants (first_name, last_name, email, phone_number, ' +
      'rental_id, created_by) VALUES ($1, $2, $3, $4, $5, $6)';
   // TODO: hash password
   const values = [ first_name, last_name, email, phone_number, rental_id, cb ];

   await model.query2(text, values);
}

module.exports.update = async (first_name, last_name, email, phone_number, rental_id, ub, id) => {
   const text = 'UPDATE tenants SET first_name = $1, last_name = $2, email = $3, ' +
      'phone_number = $4, rental_id = $5, updated_by = $6, updated_on = CURRENT_DATE ' + 
      'WHERE id = $7';
   const values = [ first_name, last_name, email, phone_number, rental_id, ub, id ];

   await model.query2(text, values);
}