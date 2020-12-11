const BaseService = require("./base.service");
let _userTrainingPathRepository = null;

class UserTrainingPathService extends BaseService {
  constructor({ UserTrainingPathRepository }) {
    super(UserTrainingPathRepository);
    _userTrainingPathRepository = UserTrainingPathRepository;
  }
  async getUsersTrainingPath() {
    return await _userTrainingPathRepository.getUsersTrainingPath();
  }
  async getTrainingPathbyUser(idUser) {
    return await _userTrainingPathRepository.getTrainingPathbyUser(idUser);
  }
  async getAvailableCourses(idUser) {
    return await _userTrainingPathRepository.getAvailableCourses(idUser);
  }

  async deleteLogicCourse(userId, coursesId) {
    return await _userTrainingPathRepository.deleteLogicCourse(
      userId,
      coursesId
    );
  }

  async updatedTrainigPath(createdLogProcess) {
    return await _userTrainingPathRepository.updatedTrainigPath(
      createdLogProcess
    );
  }
  async CreateOrupdate(id, entity) {
    const result = await _userTrainingPathRepository.getTrainingPathbyUser(id);
    //with courses
    if (result) {
      return await _userTrainingPathRepository.updateCourses(entity);
    } else {
      return await _userTrainingPathRepository.create(entity);
    }
  }
}

module.exports = UserTrainingPathService;
