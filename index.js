const express = require('express')
const path = require('path')
const admin = require('./admin.router')
const cookieSession = require('cookie-session')
const PORT = process.env.PORT || 5000

express()
   .use(express.static(path.join(__dirname, 'public')))
   .use(cookieSession({
      name: "session",
      keys: ['fhbh->2|BH10C2|^|fcr/c#'],
      // Cookie Options
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
      httpOnly: true
   }))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(express.json()) // for parsing application/json
   .use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
   .get('/', (req, res) => res.render('public/index', { title: "England Rentals" }))
   .use('/admin', admin)
   .get('/login', (req, res) => res.render('public/login', { googleSignInID: process.env.GOOGLE_SIGNIN_CLIENT_ID, title: "Login" }))
   .get('/logout', (req, res) => {
      req.session = null;
      res.render('public/logout', { googleSignInID: process.env.GOOGLE_SIGNIN_CLIENT_ID, title: "Loggged Out" });
   })
   .get('/oauth2callback', (req, res) => res.render('public/login', { googleSignInID: process.env.GOOGLE_SIGNIN_CLIENT_ID, title: "Login" }))
   .post('/oauth2callback', (req, res) => res.redirect('/'))
   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
