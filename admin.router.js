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

router.route('/user')
      .get(UserController.index)
      .post(UserController.create)
router.route('/user/:id')
      .get( UserController.show)
router.route('/landlord')
      .get(LandlordController.index)
      .post(LandlordController.create)
router.route('/landlord/:id')
      .get(LandlordController.show)
router.route('/unit')
      .get(UnitController.index)
      .post(UnitController.create)
router.route('/unit/:id')
      .get(UnitController.show)
router.route('/rental')
      .get(RentalController.index)
      .post(RentalController.create)
router.route('/rental/:id')
      .get(RentalController.show)
router.route('/tenant')
      .get(TenantController.index)
      .post(TenantController.create)
router.route('/tenant/:id')
      .get(TenantController.show)

router.get('/document', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))


module.exports = router