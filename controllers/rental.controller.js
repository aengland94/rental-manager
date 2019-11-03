const Rental = require('../models/rental');
const Unit = require('../models/unit');
const User = require('../models/user');

module.exports.index = async (req, res) => {
   try {
      const rentals = await Rental.getAllRentalsBasic();
      const units = await Unit.getAsForeignKeyOptions();
      res.render('admin/rental/index', { title: "Rental", 
                                       rentals: rentals,
                                       units: units });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = async (req, res) => {
   try {
      const rental = await Rental.getAllSafe(req.params.id);
      const created_by = await User.getAsForeignKeyInfo(rental.created_by);
      const updated_by = await User.getAsForeignKeyInfo(rental.updated_by);
      const units = await Unit.getAsForeignKeyOptions();
      res.render('admin/rental/show', { title:        "Rental Info", 
                                        rental:       rental,
                                        created_by:   created_by,
                                        updated_by:   updated_by,
                                        units:        units });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.create = async (req, res) => {
   let display_name, apt_number, description, rate, unit_id;

   if (req.body.display_name) {
      display_name = req.body.display_name;
   }

   if (req.body.apt_number) {
      apt_number = req.body.apt_number;
   }

   if (req.body.description) {
      description = req.body.description;
   }

   if (req.body.rate) {
      rate = req.body.rate;
   }

   if (req.body.unit_id) {
      unit_id = req.body.unit_id;
   }

   if (display_name && apt_number && description && rate && unit_id) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new Rental');
      await Rental.create(
         display_name, apt_number, description, rate, unit_id, 1);
   }
   console.log('Redirecting to /admin/rental');

   res.redirect('/admin/rental');
}

module.exports.edit = async (req, res) => {
   let display_name, apt_number, description, rate, unit_id;

   if (req.body.display_name) {
      display_name = req.body.display_name;
   }

   if (req.body.apt_number) {
      apt_number = req.body.apt_number;
   }

   if (req.body.description) {
      description = req.body.description;
   }

   if (req.body.rate) {
      rate = req.body.rate;
   }

   if (req.body.unit_id) {
      unit_id = req.body.unit_id;
   }

   if (display_name && apt_number && description && rate && unit_id) {
      // TODO: have updated_by be the user currently signed in
      console.log('Updating Rental');
      await Rental.create(
         display_name, apt_number, description, rate, unit_id, 1, req.params.id);
   }
   console.log('Redirecting to /admin/rental/' + req.params.id);

   res.redirect('/admin/rental/' + req.params.id);
}