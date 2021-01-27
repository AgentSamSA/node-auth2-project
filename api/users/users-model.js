const db = require("../../database/dbConfig");

module.exports = {
    insert,
    get,
    getBy,
    getById
}

function get() {
    return db('users').orderBy('user_id');
}

function getBy(param) {
    return db('users').where(param).orderBy('user_id');
}

function getById(id) {
    return db('users').where('user_id', id).first();
}

async function insert(user) {
    const [id] = await db('users').insert(user, 'user_id');
    return getById(id);
}