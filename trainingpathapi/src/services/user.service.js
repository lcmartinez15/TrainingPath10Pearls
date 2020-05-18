const BaseService = require("./base.service");
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository }) {
        super(UserRepository);
        _userRepository = UserRepository;
    }
    async getUserByUsername(email) {
        return await _userRepository.getUserByUsername(email);
    }
}

module.exports = UserService;