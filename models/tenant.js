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
      'evicted, rental_id, created_on, created_by, updated_on, updated_by ' + 
      'FROM tenants';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.create = async (first_name, last_name, email, phone_number, password, rental_id, cb) => {
   const text = 'INSERT INTO tenants (first_name, last_name, email, phone_number, ' +
      'password, rental_id, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7)';
   // TODO: hash password
   const values = [ first_name, last_name, email, phone_number, password, rental_id, cb ];

   await model.query2(text, values);
}