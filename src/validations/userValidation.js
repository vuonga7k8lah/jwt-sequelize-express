const Joi = require("joi");

const login = {
    body: Joi.object().keys({
        email: Joi.string(),
        password: Joi.string(),
        social: Joi.number(),
    }),
};
const getUser = {
    params: Joi.object().keys({
        id: Joi.number(),
    }),
};
const create = {
    body: Joi.object().keys({
        email: Joi.string(),
        name: Joi.string(),
        profile: Joi.string(),
        types: Joi.string(),
        subjects: Joi.string(),
        school: Joi.string(),
        password: Joi.string(),
        social: Joi.number(),
    }),
};
module.exports = {
    login,
    getUser,
};
