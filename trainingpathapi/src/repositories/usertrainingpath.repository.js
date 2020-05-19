const BaseRepository = require("./base.repository");
let _userTrainingPath = null;
class UserTrainigPathRepository extends BaseRepository {
    constructor({ UserTrainingPath }) {
        super(UserTrainingPath);
        _userTrainingPath = UserTrainingPath;
    }
}

module.exports = UserTrainigPathRepository;