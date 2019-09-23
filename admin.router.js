const express = require('express')
const router = express.Router()
const User = require('./models/user');
const { Pool } = require('pg');
const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true
});

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

router.get('/user', async (req, res) => {
     try {
        console.log(User.getAllUsers());
        //const results = { 'results': User.getAllUsers() };
        res.render('admin/index', { title: "User" })
        //res.render('pages/user', results);
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })

router.get('/db', async (req, res) => {
     try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null };
        res.render('pages/db', results);
        client.release();
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })

router.get('/dbTest01', async (req, res) => {
     try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null };
        client.release();
        res.render('pages/db', results);
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })

router.get('/dbTest02', async (req, res) => {
     try {
        const results = { 'results': User.getDbTest() };
        res.render('pages/db', results);
        client.release();
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
     }
  })


module.exports = router