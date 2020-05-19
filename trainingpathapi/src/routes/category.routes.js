const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");

module.exports = function({ CategoryController }) {
    const router = Router();

    router.get("", [ParseIntMiddleware], CategoryController.getAll);
    router.post("", CategoryController.create);
    router.get("/:categoryId", CategoryController.get);
    router.patch("/:categoryId", AuthMiddleware, CategoryController.update);
    router.delete("/:categoryId", AuthMiddleware, CategoryController.delete);

    return router;
};