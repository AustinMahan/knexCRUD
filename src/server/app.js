(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const cookieSession = require('cookie-session')
  const appConfig = require('./config/main-config.js');
  const routeConfig = require('./config/route-config.js');
  const errorConfig = require('./config/error-config.js');

  // *** express instance *** //
  const app = express();

  app.use(cookieParser());
  app.use(cookieSession({
    name: 'session',
    options: {maxAge: 10000},
    keys: ['key1', 'key2']
  }))

  // *** config *** //
  appConfig.init(app, express);
  routeConfig.init(app);
  errorConfig.init(app);

  module.exports = app;

}());
