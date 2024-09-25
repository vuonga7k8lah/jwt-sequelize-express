const express = require("express");

const userRouter = require("./userRoute");
const mediaRoute = require("./mediaRoute");
const authRoute = require("./auth.route");
const router = express.Router();

router.get("/status", (req, res) => {
    res.status(200).json({
        message: "call api ok",
    });
});
//auth
router.use("/auth", authRoute);

router.use(userRouter);
router.use(mediaRoute);

// const devRoutes = [
//     // routes available only in development mode
//     {
//         path: "/api-docs",
//         route: docsRoute,
//     },
// ];

// /* istanbul ignore next */
// if (process.env.IS_DEV === "test") {
//     devRoutes.forEach((route) => {
//         router.use(route.path, route.route);
//     });
// }
module.exports = {
    APIs_V1: router,
};
