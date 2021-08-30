exports.up = async function(knex) {
    await knex.schema
    .createTable("users", tbl => {
        tbl.increments("user_id");
        tbl.string("username", 80).notNullable();
        tbl.string("password").notNullable();
    })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists("users")
};
