
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors_books', function (table) {
    table.integer('book_id')
    table.integer('author_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors_books')
};
