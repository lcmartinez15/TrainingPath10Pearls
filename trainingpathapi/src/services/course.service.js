const BaseService = require("./base.service");
const axios = require("axios");
let _courseRepository = null;
let _chapterRepository = null;

class CourseService extends BaseService {
    constructor({ CourseRepository, ChapterRepository }) {
        super(CourseRepository, ChapterRepository);
        _courseRepository = CourseRepository;
        _chapterRepository = ChapterRepository;
    }

    async createCourseAndChapters(entity) {
        var course = {
            title: entity.title,
            link: entity.link,
            time: entity.time,
            category: "5ec340f457848d35cc415712",
        };

        return await this.repository.create(course);
    }

    async searchCourseUdemy(search) {
        console.log("consulta a udemy" + search);

        const config = {
            headers: {
                Accept: "application/json, text/plain, */*",
                Authorization: "Basic YU9RMWpGTnBIMk9zcDZlRTBIV2IwME1sajFZamtnOUlKVUNzdzN4NDpuQXVQT3p6cFpQeEV5Q3dITElxSnlndG95dW5vYTk5VXhsRVoyM3V5M29iQzduaE94cmY1Qng0c0s3bHNqZTBMWjZDR2ExWGx3TzFyM0M4U1RtZVZjQVhrR2tFNzdiOWdiNkY0MHZrdEdyQUxMSmVvS1RkbHI5aWt5NTZ0RTV1WQ==",
                "Content-Type": "application/json;charset=utf-8",
            },
        };

        const res = await axios.get(
            "https://www.udemy.com/api-2.0/courses/?page=1&page_size=20&search=" +
            search,
            config
        );
        console.log(res);
        return res.data;
    }

    async searchChaptersByCourseUdemy(courseId) {
        console.log("consulta a udemy");

        const config = {
            headers: {
                Accept: "application/json, text/plain, */*",
                Authorization: "Basic YU9RMWpGTnBIMk9zcDZlRTBIV2IwME1sajFZamtnOUlKVUNzdzN4NDpuQXVQT3p6cFpQeEV5Q3dITElxSnlndG95dW5vYTk5VXhsRVoyM3V5M29iQzduaE94cmY1Qng0c0s3bHNqZTBMWjZDR2ExWGx3TzFyM0M4U1RtZVZjQVhrR2tFNzdiOWdiNkY0MHZrdEdyQUxMSmVvS1RkbHI5aWt5NTZ0RTV1WQ==",
                "Content-Type": "application/json;charset=utf-8",
            },
        };

        const res = await axios.get(
            "https://www.udemy.com/api-2.0/courses/" +
            courseId +
            "/public-curriculum-items/?page=1&page_size=500",
            config
        );
        console.log(res);
        return res.data;
    }
}

module.exports = CourseService;