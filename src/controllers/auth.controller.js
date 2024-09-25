const { StatusCodes } = require("http-status-codes");
const MessageFactory = require("../utils/messageFactory");
const catchAsync = require("../utils/catchAsync");
const {
    authService,
    userService,
    tokenService,
    emailService,
} = require("../services");
const tokenTypes = require("../utils/enums/tokenTypesEnum");

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(StatusCodes.OK).json(
        MessageFactory.success(user, "Get all wishlist tool success!")
    );
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(StatusCodes.OK).json(
        MessageFactory.success("", "Get all wishlist tool success!")
    );
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
        req.body.email
    );
    await emailService.sendResetPasswordEmail(
        req.body.email,
        resetPasswordToken
    );
    res.status(StatusCodes.OK).json(
        MessageFactory.success(null, "Get all wishlist tool success!")
    );
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(StatusCodes.OK).json(
        MessageFactory.success(null, "Get all wishlist tool success!")
    );
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
        req.user
    );
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(StatusCodes.OK).json(
        MessageFactory.success(null, "Get all wishlist tool success!")
    );
});

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(StatusCodes.OK).json(
        MessageFactory.success(null, "Get all wishlist tool success!")
    );
});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};
