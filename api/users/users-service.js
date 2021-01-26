module.exports = {
    checkValidUser
}

function checkValidUser() {
    return Boolean(user.username && user.password && typeof user.password === "string");
}