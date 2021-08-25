exports.up = function(knex) {
    return knex.schema.createTable('wings', tbl => {
        tbl.increments()
        tbl.string('flavor', 128).notNullable()
        tbl.increments('amount').notNullable()
        tbl.string('location', 128).notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('wings')
}