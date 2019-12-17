const Landlord = require('../models/landlord');
const User = require('../models/user');

module.exports.index = async (req, res) => {
   try {
      const landlords = await Landlord.getAllLandlordsBasic();
      res.render('admin/landlord/index', { title:     "Landlord", 
                                           landlords: landlords,
                                           userName:  req.session.userName });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = async (req, res) => {
   try {
      const landlord = await Landlord.getAllSafe(req.params.id);
      const created_by = await User.getAsForeignKeyInfo(landlord.created_by);
      const updated_by = await User.getAsForeignKeyInfo(landlord.updated_by);
      res.render('admin/landlord/show', { title:        "Landlord Info", 
                                          landlord:     landlord,
                                          created_by:   created_by,
                                          updated_by:   updated_by,
                                          userName:     req.session.userName });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
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

module.exports.edit = async (req, res) => {
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
      // TODO: have updated_by be the user currently signed in
      console.log('Updating Landlord');
      await Landlord.update(first_name, last_name, email, 1, req.params.id);
   }
   console.log('Redirecting to /admin/landlord/' + req.params.id);

   res.redirect('/admin/landlord/' + req.params.id);
}