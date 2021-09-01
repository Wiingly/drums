const bcrypt = require('bcrypt')
const { BCRYPT_ROUNDS, SEED_PASSWORD } = require('../../utils/env-fallbacks')



exports.seed =   function (knex) {
  const password = bcrypt.hashSync(SEED_PASSWORD, BCRYPT_ROUNDS)

    return knex('users').insert([
      {username: 'n', password: password},
      {username: 'p', password: password},
      {username: 'ping', password: password},
    ]);
};