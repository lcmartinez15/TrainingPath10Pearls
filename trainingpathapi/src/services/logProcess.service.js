const BaseService = require("./base.service");
let _logProcessRepository = null;

class LogProcessService extends BaseService {
    constructor({ LogProcessRepository }) {
        super(LogProcessRepository);
        _logProcessRepository = LogProcessRepository;
    }
}

module.exports = LogProcessService;