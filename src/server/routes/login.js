const express = require('express');
const router = express.Router();
// var cookieSession = require('cookie-session')({secret: 'secret'});
const indexController = require('../controllers/index');
const knex = require('../db/knex');
const bcrypt = require('bcrypt')

router.get('/', function (req, res, next) {
  const renderObj = {};
  renderObj.title = 'Login';
  res.render('login', renderObj)
});

router.post('/', function(req, res, next) {
  var user = req.body.username;
  var pass = req.body.username;
  if (user.length > 0 && pass.length > 0) {
    knex('users').select('password').where('username', user).then(function(data) {
      if (data.length > 0) {
        if (bcrypt.compareSync('password', data[0].password)) {
          req.session.loggedIn = true;
          res.redirect('books')
        }else {
          res.send('password no good')
        }
      }else {
        res.send('username no good')
      }
    })
  }
})

module.exports = router;
