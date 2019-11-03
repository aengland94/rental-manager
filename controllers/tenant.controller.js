const Tenant = require('../models/tenant');
const Rental = require('../models/rental');
const User = require('../models/user');

module.exports.index = async (req, res) => {
   try {
      const tenants = await Tenant.getAllTenantsBasic();
      const rentals = await Rental.getAsForeignKeyOptions();
      res.render('admin/tenant/index', { title: "Tenant", 
                                       tenants: tenants,
                                       rentals: rentals });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = async (req, res) => {
   try {
      const tenant = await Tenant.getAllSafe(req.params.id);
      const created_by = await User.getAsForeignKeyInfo(tenant.created_by);
      const updated_by = await User.getAsForeignKeyInfo(tenant.updated_by);
      const rentals = await Rental.getAsForeignKeyOptions();
      res.render('admin/tenant/show', { title:        "Tenant Info", 
                                        tenant:       tenant,
                                        created_by:   created_by,
                                        updated_by:   updated_by,
                                        rentals:      rentals });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.create = async (req, res) => {
   let first_name, last_name, email, phone_number, rental_id;

   if (req.body.first_name) {
      first_name = req.body.first_name;
   }

   if (req.body.last_name) {
      last_name = req.body.last_name;
   }

   if (req.body.email) {
      email = req.body.email;
   }

   if (req.body.phone_number) {
      phone_number = req.body.phone_number;
   }

   if (req.body.rental_id) {
      rental_id = req.body.rental_id;
   }

   if (first_name && last_name && email && phone_number && rental_id) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new Tenant');
      await Tenant.create(
         first_name, last_name, email, phone_number, rental_id, 1);
      // TODO: send activation email to user tenant
   }
   console.log('Redirecting to /admin/tenant');

   res.redirect('/admin/tenant');
}

module.exports.edit = async (req, res) => {
   let first_name, last_name, email, phone_number, rental_id;

   if (req.body.first_name) {
      first_name = req.body.first_name;
   }

   if (req.body.last_name) {
      last_name = req.body.last_name;
   }

   if (req.body.email) {
      email = req.body.email;
   }

   if (req.body.phone_number) {
      phone_number = req.body.phone_number;
   }

   if (req.body.rental_id) {
      rental_id = req.body.rental_id;
   }

   if (first_name && last_name && email && phone_number && rental_id) {
      // TODO: have updated_by be the user currently signed in
      console.log('Updating Tenant');
      await Tenant.update(
         first_name, last_name, email, phone_number, rental_id, 1, req.params.id);
   }
   console.log('Redirecting to /admin/tenant/' + req.params.id);

   res.redirect('/admin/tenant/' + req.params.id);
}