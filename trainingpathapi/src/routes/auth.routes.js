const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ AuthController }) {
    const router = Router();
    router.get("/", AuthMiddleware, AuthController.getUser);
    router.post("/signup", AuthController.signUp);
    router.post("/signin", AuthController.signIn);

    return router;
};