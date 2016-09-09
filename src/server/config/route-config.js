(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const books = require('../routes/books')
    const author = require('../routes/author')
    const login = require('../routes/login')

    // *** register routes *** //
    app.use('/', routes);
    app.use('/authors', author)
    app.use('/books', books)
    app.use('/login', login)

  };

})(module.exports);
