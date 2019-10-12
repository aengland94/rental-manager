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