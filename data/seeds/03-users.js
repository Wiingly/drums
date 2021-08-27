const users = [
    { 
        username: "n",
        password: "wing"
    },
]

exports.seed = async function(knex) {
    await knex('users').insert(users)
}