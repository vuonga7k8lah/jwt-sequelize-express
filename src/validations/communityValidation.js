const Joi = require("joi");

const create = {
    body: Joi.object().keys({
        title: Joi.string(),
        content: Joi.string(),
        type: Joi.string(),
        user_id: Joi.number(),
    }),
};
const get = {
    params: Joi.object().keys({
        id: Joi.number(),
    }),
};
module.exports = {
    create,
    get,
};
