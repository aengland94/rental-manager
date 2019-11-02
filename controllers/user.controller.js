const User = require('../models/user');

module.exports.index = async (req, res) => {
   try {
      const users = await User.getAllUsersBasic();
      res.render('admin/user/index', { title: "User", 
                                       users: users });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   const user = await User.getAllSafe(req.params.id);
   res.render('admin/index', { title: "User Info", 
                               user: user });
}

module.exports.create = async (req, res) => {
   let first_name, last_name, email, username;

   if (req.body.first_name) {
      first_name = req.body.first_name;
   }

   if (req.body.last_name) {
      last_name = req.body.last_name;
   }

   if (req.body.email) {
      email = req.body.email;
   }

   if (req.body.username) {
      username = req.body.username;
   }

   if (first_name && last_name && email && username) {
      // TODO: have created_by be the user currently signed in
      console.log('Creating new User');
      await User.create(first_name, last_name, email, username, 1);
      // TODO: send activation email to new user
   }
   console.log('Redirecting to /admin/user');

   res.redirect('/admin/user');
}

module.exports.edit = async (req, res) => {
   let first_name, last_name, email, username;

   if (req.body.first_name) {
      first_name = req.body.first_name;
   }

   if (req.body.last_name) {
      last_name = req.body.last_name;
   }

   if (req.body.email) {
      email = req.body.email;
   }

   if (req.body.username) {
      username = req.body.username;
   }

   if (first_name && last_name && email && username) {
      // TODO: have updated_by be the user currently signed in
      console.log('Updating User');
      await User.update(first_name, last_name, email, username, 1);
   }
   console.log('Redirecting to /admin/user/' + req.params.id);

   res.redirect('/admin/user/' + req.params.id);
}