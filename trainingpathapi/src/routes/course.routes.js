const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");

module.exports = function({ CourseController }) {
    const router = Router();

    router.get("", [ParseIntMiddleware], CourseController.getAll);
    router.post("/create", CourseController.create);
    router.get("/:courseId", CourseController.get);
    router.patch("/:courseId", AuthMiddleware, CourseController.update);
    router.delete("/:courseId", AuthMiddleware, CourseController.delete);

    return router;
};