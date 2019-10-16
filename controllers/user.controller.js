const User = require('../models/user');

module.exports.index = async (req, res) => {
  try {
     const users = await User.getAllUsersBasic();
     res.render('admin/user/index', { title: "User", results: users })
  } catch (err) {
     console.error(err);
     res.send("Error " + err);
  }
}