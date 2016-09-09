
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('authors_books').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Martelli').select('id')), book_id: (knex('books').where('title', 'Python In A Nutshell').select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Ravenscroft').select('id')), book_id: (knex('books').where('title', 'Python In A Nutshell').select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Holden').select('id')), book_id: (knex('books').where('title', 'Python In A Nutshell').select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Downey').select('id')), book_id: (knex('books').where('title', 'Think Python').select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Simpson').select('id')), book_id: (knex('books').where('title', `You Don't Know JS: ES6 & Beyond`).select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Simpson').select('id')), book_id: (knex('books').where('title', `You Don't Know JS: Scope & Closures`).select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Simpson').select('id')), book_id: (knex('books').where('title', `You Don't Know JS: Async & Performance`).select('id'))}),

        knex('authors_books').insert({author_id: (knex('authors').where('last_name', 'Eisenman').select('id')), book_id: (knex('books').where('title', 'Learning React Native').select('id'))})
      ]);
    });
};
