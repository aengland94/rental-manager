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

module.exports.getAllSafe = async (id) => {
   const text = 'SELECT id, first_name, last_name, email, created_on, ' + 
      'created_by, updated_on, updated_by FROM landlords WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.getAsForeignKeyOptions = async () => {
   const queryString = 'SELECT id, email FROM landlords';
   const result = await model.query1(queryString);

   return (result) ? result.rows : null;
}

module.exports.getAsForeignKeyInfo = async (id) => {
   const text = 'SELECT id, email FROM landlords WHERE id = $1';
   const values = [ id ];
   const result = await model.query2(text, values);

   return (result) ? result.rows[0] : null;
}

module.exports.create = async (first_name, last_name, email, cb) => {
   const text = 'INSERT INTO landlords (first_name, last_name, email, ' +
      'created_by) VALUES ($1, $2, $3, $4)';
   const values = [ first_name, last_name, email, cb ];

   await model.query2(text, values);
}

module.exports.update = async (first_name, last_name, email, ub, id) => {
   const text = 'UPDATE landlords SET first_name = $1, last_name = $2, ' +
      'email = $3, updated_by = $4, updated_on = CURRENT_DATE ' + 
      'WHERE id = $5';
   const values = [ first_name, last_name, email, ub, id ];

   await model.query2(text, values);
}