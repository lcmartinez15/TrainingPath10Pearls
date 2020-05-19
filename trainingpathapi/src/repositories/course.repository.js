const BaseRepository = require("./base.repository");
let _course = null;
class CourseRepository extends BaseRepository {
    constructor({ Course }) {
        super(Course);
        _course = Course;
    }
}

module.exports = CourseRepository;