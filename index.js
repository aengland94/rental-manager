const express = require('express')
const path = require('path')
const admin = require('./admin.router')
const PORT = process.env.PORT || 5000

express()
   .use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(express.json()) // for parsing application/json
   .use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
   .get('/', (req, res) => res.render('pages/index'))
   .use('/admin', admin)
   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
