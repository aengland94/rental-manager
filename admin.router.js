const express = require('express')
const router = express.Router()
const AdminAuthMiddleware = require('./middleware/admin.auth.middleware');
const UserController = require('./controllers/user.controller');
const LandlordController = require('./controllers/landlord.controller');
const UnitController = require('./controllers/unit.controller');
const RentalController = require('./controllers/rental.controller');
const TenantController = require('./controllers/tenant.controller');

router.route('/login')
      .get((req, res) => res.render('public/login', { googleSignInID: process.env.GOOGLE_SIGNIN_CLIENT_ID, title: "Login" }))
      .post(AdminAuthMiddleware.loginAdmin)

router.use(AdminAuthMiddleware.checkAuth)

router.get('/', (req, res) => res.render('admin/index', { title:    "Dashboard",
                                                          userName: req.session.userName }))

router.route('/user')
      .get(UserController.index)
      .post(UserController.create)
router.route('/user/:id')
      .get(UserController.show)
router.route('/user/:id/edit')
      .post(UserController.edit)
router.route('/landlord')
      .get(LandlordController.index)
      .post(LandlordController.create)
router.route('/landlord/:id')
      .get(LandlordController.show)
router.route('/landlord/:id/edit')
      .post(LandlordController.edit)
router.route('/unit')
      .get(UnitController.index)
      .post(UnitController.create)
router.route('/unit/:id')
      .get(UnitController.show)
router.route('/unit/:id/edit')
      .post(UnitController.edit)
router.route('/rental')
      .get(RentalController.index)
      .post(RentalController.create)
router.route('/rental/:id')
      .get(RentalController.show)
router.route('/rental/:id/edit')
      .post(RentalController.edit)
router.route('/tenant')
      .get(TenantController.index)
      .post(TenantController.create)
router.route('/tenant/:id')
      .get(TenantController.show)
router.route('/tenant/:id/edit')
      .post(TenantController.edit)

router.get('/document', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))


module.exports = router