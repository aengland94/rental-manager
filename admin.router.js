const express = require('express')
const router = express.Router()
const UserController = require('./controllers/user.controller');
const LandlordController = require('./controllers/landlord.controller');
const UnitController = require('./controllers/unit.controller');
const RentalController = require('./controllers/rental.controller');
const TenantController = require('./controllers/tenant.controller');

router.use(function adminAuth (req, res, next) {
   // TODO: add auth check
   console.log('Checking Admin Auth at: ', Date.now())
   next()
})

router.get('/', (req, res) => res.render('admin/index', { title: "Dashboard" }))

router.get('/user', UserController.index)
router.get('/user/:id', UserController.show)
router.get('/landlord', LandlordController.index)
router.get('/landlord/:id', LandlordController.show)
router.get('/unit', UnitController.index)
router.get('/unit/:id', UnitController.show)
router.get('/rental', RentalController.index)
router.get('/rental/:id', RentalController.show)
router.get('/tenant', TenantController.index)
router.get('/tenant/:id', TenantController.show)

router.get('/document', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))


module.exports = router