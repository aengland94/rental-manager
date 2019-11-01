const Tenant = require('../models/tenant');

module.exports.index = async (req, res) => {
   try {
      const tenants = await Tenant.getAllTenantsBasic();
      res.render('admin/tenant/index', { title: "Tenant", results: tenants });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "Tenant " + req.params.id });
}

module.exports.create = async (req, res) => {
   let first_name, last_name, email, phone_number, rental_id, password;

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

   // TODO: auto-generate temp password for new tenants
   password = 'secret';

   if (first_name && last_name && email && phone_number && rental_id) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new Tenant');
      await Tenant.create(
         first_name, last_name, email, phone_number, password, rental_id, 1);
      // TODO: send activation email to user tenant
   }
   console.log('Redirecting to /admin/tenant');

   res.redirect('/admin/tenant');
}