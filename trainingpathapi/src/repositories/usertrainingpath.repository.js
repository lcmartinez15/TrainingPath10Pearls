const BaseRepository = require("./base.repository");
let _userTrainingPath = null;
let _course = null;
class UserTrainingPathRepository extends BaseRepository {
  constructor({ UserTrainingPath, Course }) {
    super(UserTrainingPath, Course);
    _userTrainingPath = UserTrainingPath;
    _course = Course;
  }

  async getUsersTrainingPath() {
    return await _userTrainingPath.find().populate("user").populate({
      path: "courses.courseRef",
      model: "course",
    });
  }

  async getTrainingPathbyUser(idUser) {
    return await _userTrainingPath
      .findOne({ user: idUser })
      .populate("user")
      .populate({
        path: "courses.courseRef",
        model: "course",
      });
  }
  async getAvailableCourses(idUser) {
    const courseByUser = await _userTrainingPath
      .findOne({ user: idUser })
      .distinct("courses.courseRef");

    const newCourseList = courseByUser.map((course) => course.toString());

    const courses = await _course.find();
    const result = courses.filter((course) => {
      const temp = newCourseList.findIndex(
        (oldCourse) => oldCourse == course.id
      );
      return temp == -1;
    });

    return result;
  }

  async updateCourses(entity) {
    const trainingPath = await _userTrainingPath.findOne({ user: entity.user });

    const lista = [...entity.courses];

    trainingPath.courses = [...trainingPath.courses, ...lista];

    return await this.model.findByIdAndUpdate(trainingPath.id, trainingPath, {
      new: true,
    });
  }
}

module.exports = UserTrainingPathRepository;
