const db = require('../../data/db-config');

function findByFilter(filter) {
    return db('users')
        .select('user_id', 'username', 'password')
        .where(filter)
        .first();
}

function findUsername(u) {
    return db('users')
        .select('username')
        .where('user_id', u)
}

function findID(u) {
    return db('users')
        .select('user_id', u)
}

function update(id, changes) {
    return db('users')
        .select('username')
        .where('user_id', id)
        .update(changes);
}

async function add(user) {
    const [user_id] = await db("users").insert(user, "user_id");
    return findByFilter({ user_id });
}

module.exports = {
    findByFilter,
    findUsername,
    findID,
    update,
    add
};