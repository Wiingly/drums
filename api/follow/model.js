const db = require('../../data/db-config');

function findById(id) {
    return db("followers")
        .where("user1_id", id)
        .select("user2_id")
}

function totalWings(id) {
    return db("wings")
        .where("user_id", id)
        .sum({total: "amount"})
}

function findUsername(id) {
    return db("users")
        .where("user_id", id)
        .select("username")
}

async function Follow(newFriend){
    const [friend_id] = await db('followers')
        .insert(newFriend, "user1_id");
    return findById(friend_id);
}

async function findFriend(id) {
    return db('followers')
            .where()
            .select("user1_id", id)
            .then()
}

module.exports = {
    findById,
    Follow,
    totalWings,
    findUsername,
    findFriend
};