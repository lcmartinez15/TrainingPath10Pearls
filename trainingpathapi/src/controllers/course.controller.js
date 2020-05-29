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
        const createdCourse = await _courseService.createCourseAndChapters(body);
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

    //Search udemy courses
    async search(req, res) {
        const { search } = req.query;
        console.log("controller course udemy");
        const udemyCourses = await _courseService.searchCourseUdemy(search);
        return res.status(201).send(udemyCourses);
    }

    async searchChapter(req, res) {
        const { courseId } = req.query;
        console.log("controller course udemy");
        const udemyCourses = await _courseService.searchChaptersByCourseUdemy(
            courseId
        );
        return res.status(201).send(udemyCourses);
    }
}

module.exports = CourseController;