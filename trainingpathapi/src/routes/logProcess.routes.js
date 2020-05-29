const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");

module.exports = function({ LogProcessController }) {
    const router = Router();

    router.get("", [ParseIntMiddleware], LogProcessController.getAll);
    router.post("", LogProcessController.create);
    router.get("/:logProcessId", LogProcessController.get);
    router.patch("/:logProcessId", AuthMiddleware, LogProcessController.update);
    router.delete("/:logProcessId", AuthMiddleware, LogProcessController.delete);

    return router;
};