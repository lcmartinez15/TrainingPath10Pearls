const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ UserController }) {
    const router = Router();

    router.get("/:userId", UserController.get);
    router.get("", [AuthMiddleware], UserController.getAll);
    return router;
};