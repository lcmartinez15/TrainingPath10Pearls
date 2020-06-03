const BaseService = require("./base.service");
let _logProcessRepository = null;

class LogProcessService extends BaseService {
  constructor({ LogProcessRepository }) {
    super(LogProcessRepository);
    _logProcessRepository = LogProcessRepository;
  }

  async getAvailableChapters(courseId, userId) {
    return await _logProcessRepository.getAvailableChapters(courseId, userId);
  }

  async getLogProcessUser(courseId, userId) {
    return await _logProcessRepository.getLogProcessUser(courseId, userId);
  }
}

module.exports = LogProcessService;
