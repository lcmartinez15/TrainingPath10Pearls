let _logProcessService = null;
let _userTrainingPathService = null;

class LogProcessController {
  constructor({ LogProcessService, UserTrainingPathService }) {
    _logProcessService = LogProcessService;
    _userTrainingPathService = UserTrainingPathService;
  }

  async get(req, res) {
    const { logProcessId } = req.params;
    const LogProcess = await _logProcessService.get(logProcessId);
    return res.send(LogProcess);
  }

  async create(req, res) {
    const { body } = req;
    console.log("controller LogProcess " + body);
    const createdLogProcess = await _logProcessService.create(body);
    //Update Training path
    const updatedTrainigPath = await _userTrainingPathService.updatedTrainigPath(
      createdLogProcess
    );
    return res.status(201).send(createdLogProcess);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const LogProcesss = await _logProcessService.getAll(pageSize, pageNum);
    return res.send(LogProcesss);
  }

  async update(req, res) {
    const { body } = req;
    const { logProcessId } = req.params;

    console.log("log process", body);
    const updateLogProcess = await _logProcessService.update(
      logProcessId,
      body
    );
    return res.send(updateLogProcess);
  }

  async delete(req, res) {
    const { logProcessId } = req.params;
    const deleteLogProcess = await _logProcessService.deleteLogic(logProcessId);
    return res.send(deleteLogProcess);
  }

  //Chapters Available
  async getAvailableChapters(req, res) {
    const { courseId, userId } = req.params;
    const availableChapters = await _logProcessService.getAvailableChapters(
      courseId,
      userId
    );
    return res.send(availableChapters);
  }
  //Chapters Available
  async getrLogProcessCourseUser(req, res) {
    const { courseId, userId } = req.params;
    const logProcessCourseUser = await _logProcessService.getLogProcessUser(
      courseId,
      userId
    );
    return res.send(logProcessCourseUser);
  }
}

module.exports = LogProcessController;
