const sessionIdToUserMap = new Map();

function setUser(id, user) {
    return sessionIdToUserMap.set(id, user);
}

function getUser(id, user) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}