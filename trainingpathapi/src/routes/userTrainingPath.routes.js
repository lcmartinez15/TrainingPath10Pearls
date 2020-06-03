const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require("../middlewares");

module.exports = function ({ UserTrainingPathController }) {
  const router = Router();

  router.get("", [ParseIntMiddleware], UserTrainingPathController.getAll);
  router.get("/:userTrainingPathId", UserTrainingPathController.get);
  router.get(
    "/AvailableCourses/:userTrainingPathId",
    UserTrainingPathController.getAvailableCourses
  );
  router.post("", UserTrainingPathController.create);
  router.patch("/:userTrainingPathId", UserTrainingPathController.update);
  router.delete("/:userId", UserTrainingPathController.delete);
  return router;
};
