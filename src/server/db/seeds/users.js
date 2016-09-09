const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(10);
var password = bcrypt.hashSync('password', salt);
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'amahan', password: password}),
        knex('users').insert({username: 'wreid', password: password}),
        knex('users').insert({username: 'mherman', password: password}),
      ]);
    });
};
