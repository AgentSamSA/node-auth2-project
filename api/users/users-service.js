module.exports = {
    checkValidUser
}

function checkValidUser(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}