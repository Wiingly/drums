const follower = [
    { 
        user1_id: 3,
        user2_id: 1,
    },
]

exports.seed = async function(knex) {
    await knex('followers').insert(follower)
}