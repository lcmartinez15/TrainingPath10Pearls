const BaseService = require("./base.service");
let _courseRepository = null;

class CourseService extends BaseService {
    constructor({ CourseRepository }) {
        super(CourseRepository);
        _courseRepository = CourseRepository;
    }
}

module.exports = CourseService;