const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function({
    HomeRoutes,
    UserRoutes,
    AuthRoutes,
    CategoryRoutes,
    CourseRoutes,
    LogProcessRoutes,
    UserTrainingPathRoutes,
}) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());
    apiRoutes.use("/home", HomeRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    apiRoutes.use("/category", CategoryRoutes);
    apiRoutes.use("/course", CourseRoutes);
    apiRoutes.use("/logProcessRoutes", LogProcessRoutes);
    apiRoutes.use("/userTrainingPathRoutes", UserTrainingPathRoutes);

    router.use("/v1/api", apiRoutes);

    router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    router.use(ErrorMiddleware);
    router.use(NotFoundMiddleware);

    return router;
};