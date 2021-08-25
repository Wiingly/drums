exports.up = async function(knex) {
    await knex.schema
    .createTable('wings', tbl => {
        tbl.increments('wing_id')
        tbl.string('flavor', 128).notNullable()
        tbl.integer('amount').notNullable()
        tbl.string('location', 128).notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('wings')
};
