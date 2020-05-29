const BaseRepository = require("./base.repository");
let _logprocess = null;
class LogProcessRepository extends BaseRepository {
    constructor({ LogProcess }) {
        super(LogProcess);
        _logprocess = LogProcess;
    }
}

module.exports = LogProcessRepository;