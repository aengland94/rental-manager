const Landlord = require('../models/landlord');

module.exports.index = async (req, res) => {
   try {
      const landlords = await Landlord.getAllLandlordsBasic();
      res.render('admin/landlord/index', { title: "Landlord", results: landlords });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "Landlord " + req.params.id });
}

module.exports.create = async (req, res) => {
   let first_name, last_name, email;

   if (req.body.first_name) {
      first_name = req.body.first_name;
   }

   if (req.body.last_name) {
      last_name = req.body.last_name;
   }

   if (req.body.email) {
      email = req.body.email;
   }

   if (first_name && last_name && email) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new Landlord');
      await Landlord.create(first_name, last_name, email, 1);
   }
   console.log('Redirecting to /admin/landlord');

   res.redirect('/admin/landlord');
}