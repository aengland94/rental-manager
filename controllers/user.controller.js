const User = require('../models/user');

module.exports.index = async (req, res) => {
   try {
      const users = await User.getAllUsersBasic();
      res.render('admin/user/index', { title: "User", results: users });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "User " + req.params.id });
}

module.exports.create = async (req, res) => {
   let first_name, last_name, email, username, password;

   if (req.query.first_name) {
      first_name = req.query.first_name;
   }

   if (req.query.last_name) {
      last_name = req.query.last_name;
   }

   if (req.query.email) {
      email = req.query.email;
   }

   if (req.query.username) {
      username = req.query.username;
   }

   // TODO: auto-generate temp password for new users
   password = 'secret';

   if (first_name && last_name && email && username && password) {
      await User.create(first_name, last_name, email, username, password);
   }

   res.redirect('/admin/user/');
}