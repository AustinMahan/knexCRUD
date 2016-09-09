// ,Book Title,Book Genre,Book Description,Book Cover URL,Author 1 First Name,Author 1 Last Name,Author 1 Biography,Author 1 Portrait URL,Author 2 First Name,Author 2 Last Name,Author 2 Biography,Author 2 Portrait URL,Author 3 First Name,Author 3 Last Name,Author 3 Biography,Author 3 Portrait URL
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('genre').notNullable().defaultTo('');
    table.text('description', ['longtext']).notNullable().defaultTo('');
    table.string('cover_url').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
