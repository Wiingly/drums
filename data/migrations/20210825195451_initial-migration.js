exports.up = async function(knex) {
    await knex.schema
    .createTable('users', tbl => {
        tbl.increments('user_id');
        tbl.string('username', 80).notNullable();
        tbl.string('password').notNullable();
    })
    .createTable('wings', tbl => {
        tbl.increments('wing_id')
        tbl.string('flavor', 128).notNullable()
        tbl.integer('amount').notNullable()
        tbl.string('location', 128).notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('wings')
    .dropTableIfExists('users')
};
