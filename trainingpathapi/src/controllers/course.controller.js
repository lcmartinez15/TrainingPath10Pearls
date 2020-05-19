let _courseService = null;

class CourseController {
    constructor({ CourseService }) {
        _courseService = CourseService;
    }

    async get(req, res) {
        const { courseId } = req.params;
        const course = await _courseService.get(courseId);
        return res.send(course);
    }

    async create(req, res) {
        const { body } = req;
        console.log("controller course " + body);
        const createdCourse = await _courseService.create(body);
        return res.status(201).send(createdCourse);
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query;

        const courses = await _courseService.getAll(pageSize, pageNum);
        return res.send(courses);
    }

    async update(req, res) {
        const { body } = req;
        const { courseId } = req.params;
        const updateCourse = await _courseService.update(courseId, body);
        return res.send(updateCourse);
    }

    async delete(req, res) {
        const { courseId } = req.params;
        const deleteCourse = await _courseService.delete(courseId);
        return res.send(deleteCourse);
    }
}

module.exports = CourseController;