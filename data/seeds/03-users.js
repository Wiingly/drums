const users = [
    { 
        username: "n",
        password: "wing"
    },
    { 
        username: "bob",
        password: "bobo"
    },
]

exports.seed = async function(knex) {
    await knex('users').insert(users)
}