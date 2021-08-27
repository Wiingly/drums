const db = require('../../data/db-config')

const get = () => {
    return db('wings')
  }

function getById(id) {
    return db("wings")
        .where("user_id", id)
        .select("flavor", "amount", "location");
}

const create = (wing) => {
    return db('wings').insert(wing)
    .then(([id]) => getById(id))
  }

module.exports = {
    get,
    getById,
    create
  }