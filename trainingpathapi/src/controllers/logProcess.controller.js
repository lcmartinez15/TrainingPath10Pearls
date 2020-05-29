let _logProcessService = null;

class LogProcessController {
    constructor({ LogProcessService }) {
        _logProcessService = LogProcessService;
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
}

module.exports = LogProcessController;