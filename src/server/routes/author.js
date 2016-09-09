const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/', function (req, res, next) {
  knex('authors_books').innerJoin('authors', 'id', 'authors_books.author_id').distinct().select('first_name', 'last_name', 'id', 'portrait_url', 'biography').then(function(data) {
    var renderObj = {}
    renderObj.auth = true;
    renderObj.data = data

    if (req.session.loggedIn) {
      renderObj.loggedIn = true;
    }else {
      renderObj.loggedIn = false;
    };
    console.log(req.session);
    var promises = data.map((author, i) => {
      return knex('authors_books').innerJoin('books', 'books.id', 'authors_books.book_id').where('authors_books.author_id', author.id).select('title').then(function(stuff) {
        renderObj.data[i].books = stuff
      })
    })

    Promise.all(promises).then(function() {
      res.render('authors', renderObj)
    })
  })
});

router.get('/new', function (req, res, next) {
  var renderObj = {}
  if (req.session.loggedIn) {
    renderObj.loggedIn = true;
  };
  renderObj.auhtor = true;
  res.render('addNew', renderObj)
})

router.get('/:id', function(req, res, next) {
  knex('authors_books').innerJoin('authors', 'id', 'authors_books.author_id').distinct().select('first_name', 'last_name', 'id', 'portrait_url', 'biography').where('id', req.params.id).then(function(data) {
    var renderObj = {}
    renderObj.auth = true;
    renderObj.data = data
    console.log(req.session);
    if (req.session.loggedIn == true) {
      renderObj.loggedIn = true;
    }else{
      renderObj.loggedIn = false;
    };
    knex('authors_books').innerJoin('books', 'books.id', 'authors_books.book_id').where('authors_books.author_id', data[0].id).select('title').then(function(stuff) {
      renderObj.data[0].books = stuff
      res.render('authors', renderObj)
    })
  })
})

router.post('/new', function(req, res, next) {
  var first_name = req.body.first_name
  var last_name = req.body.last_name
  var portrait_url = req.body.portrait_url
  var biography = req.body.biography
  if (first_name.length > 0 && last_name.length > 0 && portrait_url.length > 0 && biography.length > 0) {
    knex('authors').insert({first_name, last_name, biography, portrait_url}).then(function() {
      res.redirect('/authors')
    })
  }
})

router.delete('/:id', function(req, res, next) {
  knex('authors').where('id', req.params.id).del().then(function(){
    knex('authors_books').where('author_id', req.params.id).del().then(function() {
      res.redirect('/authors')
    })
  });
})

module.exports = router;
