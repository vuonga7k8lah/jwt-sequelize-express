const allRoles = {
    user: [],
    admin: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const defineRoles = {
    Admin: "ADMIN",
    User: "USER",
    Guest: "GUEST",
};
module.exports = {
    roles,
    roleRights,
    defineRoles,
};
