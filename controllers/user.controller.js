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

module.exports.show = async (req, res) => {
   try {
      const user = await User.getAllSafe(req.params.id);
      const created_by = await User.getAsForeignKeyInfo(user.created_by);
      const updated_by = await User.getAsForeignKeyInfo(user.updated_by);
      const date_options = { weekday: 'long', 
                             year:    'numeric', 
                             month:   'long', 
                             day:     'numeric' };
      const d = new Date(user.created_on);
      console.log("User created on: " + user.created_on);
      console.log("User created on: " + d);
      res.render('admin/user/show', { title:        "User Info", 
                                      user:         user,
                                      created_by:   created_by,
                                      updated_by:   updated_by,
                                      date_options: date_options });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
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

   if (first_name && last_name && email && username && req.params.id) {
      // TODO: have updated_by be the user currently signed in
      console.log('Updating User');
      await User.update(first_name, last_name, email, username, 1, req.params.id);
   }
   console.log('Redirecting to /admin/user/' + req.params.id);

   res.redirect('/admin/user/' + req.params.id);
}