const Rental = require('../models/rental');

module.exports.index = async (req, res) => {
   try {
      const rentals = await Rental.getAllRentalsBasic();
      res.render('admin/rental/index', { title: "Rental", results: rentals });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "Rental " + req.params.id });
}