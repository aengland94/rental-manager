const express = require('express')
const router = express.Router()

router.use(function adminAuth (req, res, next) {
  // TODO: add auth check
  console.log('Checking Admin Auth at: ', Date.now())
  next()
})

router.get('/', (req, res) => res.render('admin/index', { title: "Dashboard" }))
router.get('/tenants', (req, res) => res.render('admin/index', { title: "Tenants" }))
router.get('/tenants/:id', (req, res) => res.render('admin/index', { title: "Tenant " + req.params.id }))
router.get('/rentals', (req, res) => res.render('admin/index', { title: "Rentals" }))
router.get('/landlords', (req, res) => res.render('admin/index', { title: "Landlords" }))
router.get('/documents', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))


module.exports = router