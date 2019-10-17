const Unit = require('../models/unit');

module.exports.index = async (req, res) => {
   try {
      const units = await Unit.getAllUnitsBasic();
      res.render('admin/unit/index', { title: "Unit", results: units });
   }  catch (err) {
      console.error(err);
      res.send("Error " + err);
   }
}

module.exports.show = (req, res) => {
   res.render('admin/index', { title: "Unit " + req.params.id });
}