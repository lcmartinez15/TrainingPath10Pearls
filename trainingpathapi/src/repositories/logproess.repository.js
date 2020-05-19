const BaseRepository = require("./base.repository");
let _logprocess = null;
class LogProcessRepository extends BaseRepository {
    constructor({ Logprocess }) {
        super(Logprocess);
        _logprocess = Logprocess;
    }
}

module.exports = LogProcessRepository;