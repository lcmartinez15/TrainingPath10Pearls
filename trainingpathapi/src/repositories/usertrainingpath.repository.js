const BaseRepository = require("./base.repository");
let _userTrainingPath = null;
let _course = null;
let _chapter = null;

class UserTrainingPathRepository extends BaseRepository {
  constructor({ UserTrainingPath, Course, Chapter }) {
    super(UserTrainingPath, Course, Chapter);
    _userTrainingPath = UserTrainingPath;
    _course = Course;
    _chapter = Chapter;
  }

  async getUsersTrainingPath() {
    return await _userTrainingPath.find().populate("user").populate({
      path: "courses.courseRef",
      model: "course",
    });
  }

  async getTrainingPathbyUser(idUser) {
    //get percentage of work

    var resultTemp = await _userTrainingPath
      .findOne({ user: idUser })
      .populate("user")
      .populate({
        path: "courses.courseRef",
        model: "course",
      });

    if (resultTemp) {
      resultTemp.courses = resultTemp.courses.filter(
        (course) => !course.isDeleted
      );
    }
    console.log("trainign path",resultTemp);   

    return resultTemp;
  }
  async getAvailableCourses(idUser) {
    try {
      const courseByUser = await this.getTrainingPathbyUser(idUser);

      if (courseByUser === null) {
        return _course.find();
      }
      const newCourseList = courseByUser.courses.map((course) =>
        course.courseRef.id.toString()
      );

      const courses = await _course.find();
      const result = courses.filter((course) => {
        const temp = newCourseList.findIndex(
          (oldCourse) => oldCourse == course.id
        );
        return temp == -1;
      });

      return result;
    } catch (error) {
      return null;
    }
  }

  async updateCourses(entity) {
    // get current courses of user
    const trainingPath = await _userTrainingPath.findOne({ user: entity.user });

    const lista = [...entity.courses];

    const ListCurrentCourses = trainingPath.courses.map((course) => {
      if (course.courseRef !== null && course.courseRef !== undefined) {
        const result = lista.findIndex(
          (oldCourse) => oldCourse.courseRef == course.courseRef.toString()
        );
        if (result != -1) {
          course.isDeleted = false;
          entity.courses.filter(
            (tempo) => tempo.courseRef != course.courseRef.toString()
          );
        }
      }
      return course;
    });

    // add new courses
    trainingPath.courses = [...ListCurrentCourses, ...entity.courses];

    return await this.model.findByIdAndUpdate(trainingPath.id, trainingPath, {
      new: true,
    });
  }

  async deleteLogicCourse(userId, coursesId) {
    const trainingPath = await _userTrainingPath.findOne({ user: userId });

    trainingPath.courses = trainingPath.courses.map((course) => {
      if (course.courseRef !== null && course.courseRef !== undefined) {
        const result = coursesId.findIndex(
          (oldCourse) => oldCourse == course.courseRef.toString()
        );
        if (result != -1) {
          course.isDeleted = true;
        }
      }

      return course;
    });

    await this.model.findByIdAndUpdate(trainingPath.id, trainingPath, {
      new: true,
    });

    return await this.getTrainingPathbyUser(userId);
  }

  async updatedTrainigPath(entity) {
    //get chapter
    const chapterUdated = await _chapter.findOne({ _id: entity.chapterRef });
    // get current courses of user
    const trainingPath = await _userTrainingPath.findOne({
      user: entity.userRef,
    });

    const ListCurrentCourses = trainingPath.courses.map((course) => {
      if (course.courseRef !== null && course.courseRef !== undefined) {
        if (course.courseRef.toString() === chapterUdated.course.toString()) {
          course.percentage =
            Number(course.percentage) + Number(chapterUdated.percentage);
        }
      }
      return course;
    });

    // add new courses
    trainingPath.courses = ListCurrentCourses;

    return await this.model.findByIdAndUpdate(trainingPath.id, trainingPath, {
      new: true,
    });
  }
}

module.exports = UserTrainingPathRepository;
