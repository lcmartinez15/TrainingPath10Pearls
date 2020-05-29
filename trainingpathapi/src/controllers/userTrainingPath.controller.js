let _userTrainingPathService = null;

class UserTrainingPathController {
  constructor({ UserTrainingPathService }) {
    _userTrainingPathService = UserTrainingPathService;
  }

  async get(req, res) {
    const { userTrainingPathId } = req.params;
    const UserTrainingPath = await _userTrainingPathService.getTrainingPathbyUser(
      userTrainingPathId
    );
    return res.send(UserTrainingPath);
  }

  async create(req, res) {
    const { body } = req;
    console.log("controller UserTrainingPath " + body);
    const createdUserTrainingPath = await _userTrainingPathService.create(body);
    return res.status(201).send(createdUserTrainingPath);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;

    const UserTrainingPaths = await _userTrainingPathService.getUsersTrainingPath(
      pageSize,
      pageNum
    );
    return res.send(UserTrainingPaths);
  }

  async update(req, res) {
    const { body } = req;
    const { userTrainingPathId } = req.params;
    const updateUserTrainingPath = await _userTrainingPathService.CreateOrupdate(
      userTrainingPathId,
      body
    );
    return res.send(updateUserTrainingPath);
  }

  async delete(req, res) {
    const { userTrainingPathId } = req.params;
    const deleteUserTrainingPath = await _userTrainingPathService.deleteLogic(
      userTrainingPathId
    );
    return res.send(deleteUserTrainingPath);
  }

  async getAvailableCourses(req, res) {
    const { userTrainingPathId } = req.params;
    const result = await _userTrainingPathService.getAvailableCourses(
      userTrainingPathId
    );
    return res.send(result);
  }
}

module.exports = UserTrainingPathController;
