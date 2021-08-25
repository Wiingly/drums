const wings = [
    { flavor: "24 strong",
      amount: 12,
      location: "Big Shot Bobs"
    },
    { flavor: "cash club",
      amount: 12,
      location: "Big Shot Bobs"
    }
]

exports.seed = async function(knex) {
    await knex('wings').insert(wings)
}