const express = require('express')
const router = express.Router()
const User = require('./models/user');
const LandLord = require('./models/landlord');
const Unit = require('./models/unit');
const Rental = require('./models/rental');
const Tenant = require('./models/tenant');

router.use(function adminAuth (req, res, next) {
  // TODO: add auth check
  console.log('Checking Admin Auth at: ', Date.now())
  next()
})

router.get('/', (req, res) => res.render('admin/index', { title: "Dashboard" }))

router.get('/user', async (req, res) => {
     try {
        const users = await User.getAllUsersBasic();
        res.render('admin/user/index', { title: "User", results: users })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/user/:id', (req, res) => res.render('admin/index', { title: "User " + req.params.id }))
router.get('/landlord', async (req, res) => {
     try {
        const landlords = await Landlord.getAllLandlordsBasic();
        res.render('admin/landlord/index', { title: "Landlord", results: landlords })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/landlord/:id', (req, res) => res.render('admin/index', { title: "Landlord " + req.params.id }))
router.get('/unit', async (req, res) => {
     try {
        const units = await Unit.getAllUnitsBasic();
        res.render('admin/unit/index', { title: "Unit", results: units })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/unit/:id', (req, res) => res.render('admin/index', { title: "Unit " + req.params.id }))
router.get('/rental', async (req, res) => {
     try {
        const rentals = await Rental.getAllRentalsBasic();
        res.render('admin/rental/index', { title: "Rental", results: rentals })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/rental/:id', (req, res) => res.render('admin/index', { title: "Rental " + req.params.id }))
router.get('/tenant', async (req, res) => {
     try {
        const tenants = await Tenant.getAllTenantsBasic();
        res.render('admin/tenant/index', { title: "Tenant", results: tenants })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/tenant/:id', (req, res) => res.render('admin/index', { title: "Tenant " + req.params.id }))

router.get('/document', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))


module.exports = router