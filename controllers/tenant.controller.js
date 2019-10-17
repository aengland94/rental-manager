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