exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function (table) {
    table.increments()
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.text('biography', ['longtext']).notNullable().defaultTo('');
    table.string('portrait_url').notNullable().defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors')
};
