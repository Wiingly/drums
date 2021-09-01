const db = require('../../data/db-config');

function findById(id) {
    return db("followers")
        .where("user1_id", id)
        .select("user2_id")
}

async function Follow(newFriend){
    const [friend_id] = await db('followers')
        .insert(newFriend, "friend_id");
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
    findFriend
};