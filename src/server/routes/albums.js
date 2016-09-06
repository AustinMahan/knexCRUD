const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  var renderObj = {}
  renderObj.title = 'Welcome'
  res.render('albumPage', renderObj)
});

module.exports = router;
