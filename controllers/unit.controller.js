const Unit = require('../models/unit');
const Landlord = require('../models/landlord');
const User = require('../models/user');

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

module.exports.show = async (req, res) => {
   try {
      const unit = await Unit.getAllSafe(req.params.id);
      const created_by = await User.getAsForeignKeyInfo(unit.created_by);
      const updated_by = await User.getAsForeignKeyInfo(unit.updated_by);
      const landlords = await Landlord.getAsForeignKeyOptions();
      res.render('admin/unit/show', { title:        "Unit Info", 
                                      unit:         unit,
                                      created_by:   created_by,
                                      updated_by:   updated_by,
                                      landlords:    landlords });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.create = async (req, res) => {
   let street_address, city, state, zip_code, landlord_id;

   if (req.body.street_address) {
      street_address = req.body.street_address;
   }

   if (req.body.city) {
      city = req.body.city;
   }

   if (req.body.state) {
      state = req.body.state;
   }
   
   if (req.body.zip_code) {
      zip_code = req.body.zip_code;
   }

   if (req.body.landlord_id) {
      landlord_id = req.body.landlord_id;
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

module.exports.create = async (req, res) => {
   let street_address, city, state, zip_code, landlord_id;

   if (req.body.street_address) {
      street_address = req.body.street_address;
   }

   if (req.body.city) {
      city = req.body.city;
   }

   if (req.body.state) {
      state = req.body.state;
   }
   
   if (req.body.zip_code) {
      zip_code = req.body.zip_code;
   }

   if (req.body.landlord_id) {
      landlord_id = req.body.landlord_id;
   }

   if (street_address && city && state && zip_code && landlord_id) {
      // TODO: have updated_by be the user currently signed in
      console.log('Updating Unit');
      await Unit.create(
         street_address, city, state, zip_code, landlord_id, 1, req.params.id);
   }
   console.log('Redirecting to /admin/unit/' + req.params.id);

   res.redirect('/admin/unit/' + req.params.id);
}