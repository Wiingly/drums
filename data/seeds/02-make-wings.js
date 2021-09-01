const wings = [
    { 
      flavor: "24 strong",
      amount: 12,
      location: "Big Shot Bobs",
      user_id: 1,
    },
    { 
      flavor: "cash club",
      amount: 12,
      location: "Big Shot Bobs",
      user_id: 1,
    },
    { 
      flavor: "bbq",
      amount: 12,
      location: "bdubs",
      user_id: 2,
    },
    { 
      flavor: "garlic",
      amount: 12,
      location: "quaker",
      user_id: 3,
    },
]

exports.seed = async function(knex) {
    await knex('wings').insert(wings)
}