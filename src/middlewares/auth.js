const httpStatus = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const { roleRights } = require("../config/roles");
const tokenService = require("../services/token.service");
const tokenTypes = require("../utils/enums/tokenTypesEnum");
const RoleTypeEnum = require("../utils/enums/RoleTypeEnum");

const auth =
    (...requiredRights) =>
    async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Token is missing");
            }

            let userDoc = await tokenService.verifyToken(
                token,
                tokenTypes.ACCESS
            );

            if (requiredRights.length) {
                let hasRequiredRights =
                    userDoc.user.role === RoleTypeEnum.ADMIN;
                if (!hasRequiredRights) {
                    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
                }
            }
            req.user = userDoc.user;
            next();
        } catch (error) {
            // If there's any error (invalid token, no rights, etc.), pass it to error handler
            next(error);
        }
    };

module.exports = auth;
