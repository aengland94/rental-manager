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