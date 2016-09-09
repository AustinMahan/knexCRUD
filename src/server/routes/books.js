const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/', function (req, res, next) {
  knex('authors_books').select('title', 'genre', 'cover_url', 'description', 'id').innerJoin('books', 'authors_books.book_id', 'books.id').distinct().then((data) => {
    var renderObj = {}
    renderObj.bks = true;
    renderObj.data = data;
    if (req.session.loggedIn) {
      renderObj.loggedIn = true;
    };
    var promises = data.map((book, i) => {
      return knex('authors_books').innerJoin('authors', 'authors.id', 'authors_books.author_id').where('book_id', book.id).select('authors.first_name', 'authors.last_name').then(function(stuff) {
        var authorArr = []
        stuff.forEach(function(author){
          authorArr.push(author.first_name + ' ' + author.last_name)
        })
        renderObj.data[i].authors = authorArr.join(', ')
      })
    })

    Promise.all(promises).then(function() {
      res.render('books', renderObj)
    })
  })
});

router.get('/new', function(req, res, next) {
  var renderObj = {}
  if (req.session.loggedIn) {
    renderObj.loggedIn = true;
  };
  renderObj.book = true;
  res.render('addNew', renderObj)
})

router.get('/:id', function(req, res, next) {
  knex('authors_books').select('title', 'genre', 'cover_url', 'description', 'id').innerJoin('books', 'authors_books.book_id', 'books.id').where('id', req.params.id).distinct().then((data) => {
    var renderObj = {}
    renderObj.bks = true;
    renderObj.data = data
    if (req.session.loggedIn) {
      renderObj.loggedIn = true;
    };
      knex('authors_books').innerJoin('authors', 'authors.id', 'authors_books.author_id').where('book_id', data[0].id).select('authors.first_name', 'authors.last_name').then(function(stuff) {
        var authorArr = []
        stuff.forEach(function(author) {
          authorArr.push(author.first_name + ' ' + author.last_name)
        })
        renderObj.data[0].authors = authorArr.join(', ')
        res.render('books', renderObj)
      })
  })
})

router.post('/new', function(req, res, next) {
  var title = req.body.title
  var genre = req.body.genre
  var cover_url = req.body.cover_url
  var description = req.body.description
  var authorFirst = req.body.authorFirst
  var authorLast = req.body.authorLast
  if (title.length > 0 && genre.length > 0 && cover_url.length > 0 && description.length > 0 && authorLast.length > 0 && authorFirst.length > 0) {
    knex('books').insert({title, genre, description, cover_url}).then(function() {
      knex('authors_books').insert({author_id: (knex('authors').where('first_name', authorFirst).where('last_name', authorLast).select('id')), book_id:(knex('books').where('title', title).where('genre', genre).select('id'))}).then(function () {
        res.redirect('/books')
      })
    })
  }
})

router.delete('/:id', function(req, res, next) {
  knex('books').where('id', req.params.id).del().then(function(){
    knex('authors_books').where('book_id', req.params.id).del().then(function() {
      res.redirect('/books')
    })
  });
})

module.exports = router;
