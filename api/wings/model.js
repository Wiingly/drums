const db = require('../../data/db-config');

function findById(id) {
    return db("wings")
        .where("user_id", id)
        .select("wing_id", "flavor", "location", "amount");
}

function totalWings(id) {
    return db("wings")
        .where("user_id", id)
        .sum({total: "amount"})
}

async function addWing(newWing){
    const [wing_id] = await db('wings')
        .insert(newWing, "wing_id");
    return findById(wing_id);
}


// async function updateWing(wing_id, updatedWing) {
//     await db('wings')
//         .where("wing_id", wing_id)
//         .update(updatedWing);
//     return findUserWingsByWingsID(wing_id);
// }

// function del(wing_id){
//     return db('wings')
//         .where({wing_id})
//         .del();
// }

module.exports = {
    findById,
    totalWings,
    addWing,
    // findUserWingsByWingsID
};