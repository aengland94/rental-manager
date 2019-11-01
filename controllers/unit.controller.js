const Unit = require('../models/unit');
const Landlord = require('../models/landlord');

module.exports.index = async (req, res) => {
   try {
      const units = await Unit.getAllUnitsBasic();
      const landlords = await Landlord.getAsForeignKeyOptions();
      res.render('admin/unit/index', { title: "Unit", 
                                       units: units,
                                       landlords: landlords });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "Unit " + req.params.id });
}

module.exports.create = async (req, res) => {
   let street_address, city, state, zip_code, landlord_id;

   if (req.body.street_address) {
      street_address = req.body.street_address;
      console.log('street_address: ' + street_address);
   }

   if (req.body.city) {
      city = req.body.city;
      console.log('city: ' + city);
   }

   if (req.body.state) {
      state = req.body.state;
      console.log('state: ' + state);
   }
   console.log('req.body.zip_code: ' + req.body.zip_code);
   if (req.body.zip_code) {
      username = req.body.zip_code;
      console.log('zip_code: ' + zip_code);
   }

   if (req.body.landlord_id) {
      landlord_id = req.body.landlord_id;
      console.log('landlord_id: ' + landlord_id);
   }

   if (street_address && city && state && zip_code && landlord_id) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new Unit');
      await Unit.create(
         street_address, city, state, zip_code, landlord_id, 1);
   }
   console.log('Redirecting to /admin/unit');

   res.redirect('/admin/unit');
}