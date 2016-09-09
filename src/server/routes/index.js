const express = require('express');
const router = express.Router();
// var cookieSession = require('cookie-session')({secret: 'secret'});
const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObj = {};
  renderObj.title = 'Welcome';
  if (req.session.loggedIn) {
    renderObj.loggedIn = true;
  };
  res.render('index', renderObj)
});

module.exports = router;
