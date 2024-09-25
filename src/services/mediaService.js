const mediaModel = require("../models/mediaModel");
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { tokenService } = require(".");

exports.getAll = async ({ paged, limit, s }) => {
    const offset = (paged - 1) * limit;
    let query = {
        attributes: ["id", "name", "email", "profile", "teacher_type"],
    };

    if (paged) {
        query["offset"] = offset;
    }
    if (limit) {
        query["limit"] = limit;
    }
    if (s) {
        query["where"] = {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${s}%`,
                    },
                },
                {
                    email: {
                        [Op.like]: `%${s}%`,
                    },
                },
            ],
        };
    }

    const { count, rows } = await User.findAndCountAll(query);

    const totalPages = Math.ceil(count / limit);

    return {
        items: rows,
        totalItems: count,
        itemCount: rows.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: paged,
    };
};

exports.create = async ({
    user_id,
    file_name,
    url,
    content_type,
    size,
    width,
    height,
}) => {
    let data = await mediaModel.create({
        id: null,
        user_id,
        file_name,
        url,
        content_type,
        size,
        width,
        height,
    });

    data = data.get({ plain: true });

    return data;
};
