exports.seed =   function (knex) {

    return knex('users').insert([
      {username: 'n', password: 'wing'},
      {username: 'p', password: 'wing'},
    ]);
};