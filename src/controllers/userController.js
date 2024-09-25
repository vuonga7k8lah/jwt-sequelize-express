const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/userService");
require("dotenv").config();
//import message factory
const MessageFactory = require("../utils/messageFactory");
const RemoveValueNullObject = require("../utils/removeValueNullObject");
const WishlistTypeEnum = require("../utils/enums/wishlistTypeEnum");

exports.getAll = async (req, res) => {
    const paged = parseInt(req.query.paged) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const s = req.query.s;

    const data = await UserService.getAll({ paged, limit, s });

    if (data === null) {
        res.status(StatusCodes.UNAUTHORIZED).json(
            MessageFactory.success({}, "The data post empty.")
        );
    } else {
        res.status(StatusCodes.OK).json(
            MessageFactory.success(data, "Get all post success!")
        );
    }
};

exports.getWishlists = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const paged = parseInt(req.query.paged) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = await wishlistService.getWishlists(paged, limit, user_id);

        if (data === null) {
            res.status(StatusCodes.UNAUTHORIZED).json(
                MessageFactory.error("Get all wishlist tool error")
            );
        } else {
            res.status(StatusCodes.OK).json(
                MessageFactory.success(data, "Get all wishlist tool success!")
            );
        }
    } catch (error) {
        next(error);
    }
};
exports.createOrDeleteWishlist = async (req, res, next) => {
    try {
        const { foreign_key_id, user_id, type } = req.body;

        if (!Object.values(WishlistTypeEnum).includes(type)) {
            throw new Error("The type wishlist malformed");
        }
        if (!user_id) {
            throw new Error("The user id is required");
        }

        const data = await wishlistService.createOrDeleteWishlist(
            foreign_key_id,
            user_id,
            type
        );

        if (data === null) {
            res.status(StatusCodes.UNAUTHORIZED).json(
                MessageFactory.error("Create or delete wishlist tool error")
            );
        } else {
            res.status(StatusCodes.OK).json(
                MessageFactory.success(
                    data,
                    "Create or delete wishlist tool success!"
                )
            );
        }
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password, social } = req.body;
        if (social === 0) {
            const user = await UserService.login(email, social, password);

            if (user === null) {
                res.status(StatusCodes.UNAUTHORIZED).json(
                    MessageFactory.error("Please check email or password")
                );
            } else {
                res.status(StatusCodes.OK).json(
                    MessageFactory.success(user, "Login success!")
                );
            }
        } else {
            const user = await UserService.login(email, social);

            if (user === null) {
                res.status(StatusCodes.UNAUTHORIZED).json(
                    MessageFactory.error("no user")
                );
            } else {
                res.status(StatusCodes.OK).json(
                    MessageFactory.success(user, "Login success!")
                );
            }
        }
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.getUser(id);
        if (user) {
            res.status(StatusCodes.OK).json(
                MessageFactory.success(user, "Get User success!")
            );
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json(
                MessageFactory.error("The User not exist")
            );
        }
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        const { name, email, profile, types, subjects, school, teacher_type } =
            req.body;

        const user = await UserService.updateUser(
            id,
            name,
            email,
            profile,
            types,
            subjects,
            school,
            teacher_type
        );
        if (user) {
            res.status(StatusCodes.OK).json(
                MessageFactory.success(user, "Update User success!")
            );
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json(
                MessageFactory.error("The User not exist")
            );
        }
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        let {
            name,
            email,
            social,
            password,
            profile,
            types,
            school,
            subjects,
            picture,
        } = req.body;

        //check email
        let isEmailExit = await UserService.checkEmailExit(email);
        if (isEmailExit && social == 0) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(MessageFactory.error("The email exist!"));
        }
        if (social) {
            profile = picture;
            password = email;
        }
        if (isEmailExit && social == 1) {
            let data = await UserService.getUserWithEmail(email);
            return res
                .status(StatusCodes.OK)
                .json(
                    MessageFactory.success(
                        RemoveValueNullObject(data),
                        "Login success!"
                    )
                );
        }

        const user = await UserService.createUser(
            name,
            email,
            social,
            password,
            profile,
            types,
            school,
            subjects
        );
        if (user) {
            return res
                .status(StatusCodes.OK)
                .json(MessageFactory.success(user, "Create User success!"));
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(MessageFactory.error("The User not exist"));
        }
    } catch (error) {
        next(error);
    }
};

exports.updateImageProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, email, types, subjects, school, teacher_type } = req.body;

        if (!req.file) {
            throw new Error(
                "The error upload profile Image file does not exist"
            );
        }

        const fileImage = req.file.path;
        //url image
        let profile = process.env.BASIC_URL + "/" + fileImage;

        const user = await UserService.updateUser(
            userId,
            name,
            email,
            profile,
            types,
            subjects,
            school,
            teacher_type
        );
        if (user) {
            return res
                .status(StatusCodes.OK)
                .json(MessageFactory.success(user, "Create User success!"));
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(MessageFactory.error("The User not exist"));
        }
    } catch (error) {
        next(error);
    }
};
