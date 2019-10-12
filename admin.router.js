const express = require('express')
const router = express.Router()
const User = require('./models/user');

router.use(function adminAuth (req, res, next) {
  // TODO: add auth check
  console.log('Checking Admin Auth at: ', Date.now())
  next()
})

router.get('/', (req, res) => res.render('admin/index', { title: "Dashboard" }))
router.get('/tenant', (req, res) => res.render('admin/index', { title: "Tenants" }))
router.get('/tenant/:id', (req, res) => res.render('admin/index', { title: "Tenant " + req.params.id }))
router.get('/rental', (req, res) => res.render('admin/index', { title: "Rentals" }))
router.get('/landlord', (req, res) => res.render('admin/index', { title: "Landlords" }))
router.get('/document', (req, res) => res.render('admin/index', { title: "Documents" }))
router.get('/payments', (req, res) => res.render('admin/index', { title: "Payments" }))

router.get('/user', async (req, res) => {
     try {
        console.log(User.getAllUsers());
        const users = await User.getAllUsers();
        res.render('admin/user/index', { title: "User", results: users })
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })
router.get('/user/:id', (req, res) => res.render('admin/index', { title: "User " + req.params.id }))

router.get('/db', async (req, res) => {
     try {
        const results = { 'results': await User.getDbTest() }; // success :)
        res.render('pages/db', results);
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })


module.exports = router