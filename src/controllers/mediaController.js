const { StatusCodes } = require("http-status-codes");
const mediaService = require("../services/mediaService");
const tokenService = require("../services/token.service");
const bcrypt = require("bcryptjs");
//import message factory
const MessageFactory = require("../utils/messageFactory");
const RemoveValueNullObject = require("../utils/removeValueNullObject");
const tokenTypes = require("../utils/enums/tokenTypesEnum");
const sizeOf = require("image-size");

exports.create = async (req, res, next) => {
    try {
        let user = req.user;
        let files = req.files.media;

        let attachments = [];

        if (files) {
            for (const file of files) {
                let id = await bcrypt.hash(file.originalname, 8);
                let url = process.env.BASIC_URL + "/" + file.path;
                let contentType = file.mimetype;
                let size = file.size;
                const dimensions = sizeOf(file.path);

                const data = await mediaService.create({
                    user_id: user.id,
                    file_name: file.originalname,
                    url: url,
                    content_type: contentType,
                    size: size,
                    width: dimensions.width || null,
                    height: dimensions.height || null,
                });
                attachments.push({
                    name: file.originalname,
                    url: url,
                    id: id,
                });
            }
        }

        if (attachments) {
            res.status(StatusCodes.OK).json(
                MessageFactory.success(attachments, "Created success!")
            );
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json(
                MessageFactory.error("Created error")
            );
        }
    } catch (error) {
        next(error);
    }
};
