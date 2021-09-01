exports.up = async (knex) => {
    await knex.schema
      .createTable("followers", tbl => {
        tbl.increments("follower_id")
        tbl.integer("user1_id")
                .notNullable()
                .unsigned()
                .references("user_id")
                .inTable("users")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT");
        tbl.integer("user2_id")
                .notNullable()
                .unsigned()
                .references("user_id")
                .inTable("users")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT");
    })
  };
  
  exports.down = async (knex) => {
    await knex.schema
      .dropTableIfExists('friends')
  };
