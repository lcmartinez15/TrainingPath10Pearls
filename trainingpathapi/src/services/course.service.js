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

  async getAllCourses() {
    return await _courseRepository.getAllCourses();
  }
  async getCoursesByCategory() {
    return await _courseRepository.getCoursesByCategory();
  }

  async createCourseAndChapters(entity) {
    //Create course
    const course = {
      title: entity.title,
      link: entity.link,
      time: entity.time,
      tags: entity.tags,
      img: entity.img,
      description: entity.description,
      category: entity.category,
      exteralId: entity.id,
      isDeleted: false,
    };
    const res = await this.repository.create(course);
    let newsChapter = entity.chapters.map((chapter) => ({
      name: chapter.title,
      type: chapter._class,
      time: chapter.time,
      percentage: (Number(chapter.time) / Number(res.time)) * 100,
      description: chapter.description,
      course: res.id,
      exteralId: chapter.id,
      isDeleted: false,
    }));

    const resChapters = await _chapterRepository.bulkInsert(newsChapter);
    return res;
  }

  async searchCourseUdemy(search) {
    console.log("consulta a udemy" + search);

    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization:
          "Basic YU9RMWpGTnBIMk9zcDZlRTBIV2IwME1sajFZamtnOUlKVUNzdzN4NDpuQXVQT3p6cFpQeEV5Q3dITElxSnlndG95dW5vYTk5VXhsRVoyM3V5M29iQzduaE94cmY1Qng0c0s3bHNqZTBMWjZDR2ExWGx3TzFyM0M4U1RtZVZjQVhrR2tFNzdiOWdiNkY0MHZrdEdyQUxMSmVvS1RkbHI5aWt5NTZ0RTV1WQ==",
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
        Authorization:
          "Basic YU9RMWpGTnBIMk9zcDZlRTBIV2IwME1sajFZamtnOUlKVUNzdzN4NDpuQXVQT3p6cFpQeEV5Q3dITElxSnlndG95dW5vYTk5VXhsRVoyM3V5M29iQzduaE94cmY1Qng0c0s3bHNqZTBMWjZDR2ExWGx3TzFyM0M4U1RtZVZjQVhrR2tFNzdiOWdiNkY0MHZrdEdyQUxMSmVvS1RkbHI5aWt5NTZ0RTV1WQ==",
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
