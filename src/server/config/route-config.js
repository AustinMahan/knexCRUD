(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const albums = require('../routes/albums')

    // *** register routes *** //
    app.use('/', routes);
    app.use('/albums', albums)

  };

})(module.exports);
