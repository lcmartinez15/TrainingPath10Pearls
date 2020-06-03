const BaseRepository = require("./base.repository");
let _logprocess = null;
let _chapter = null;
class LogProcessRepository extends BaseRepository {
  constructor({ LogProcess, Chapter }) {
    super(LogProcess, Chapter);
    _logprocess = LogProcess;
    _chapter = Chapter;
  }

  async getAvailableChapters(courseId, userId) {
    const currentChapters = await this.getLogProcessUser(courseId, userId);

    if (currentChapters === null) {
      return await _chapter.find({ course: courseId });
    }

    const newChaptersList = currentChapters.map((log) =>
      log.chapterRef.id.toString()
    );

    const chapters = await _chapter.find({ course: courseId });

    const result = chapters.filter((chapter) => {
      const temp = newChaptersList.findIndex(
        (oldCourse) => oldCourse == chapter.id
      );
      return temp == -1;
    });

    return result;
  }

  async getLogProcessUser(courseId, userId) {
    // get current chapters by course
    const chaptersCourse = await _logprocess
      .find({ userRef: userId })
      .populate("chapterRef");

    let result = chaptersCourse.filter(
      (log) => log.chapterRef.course == courseId
    );
    return result;
  }
}

module.exports = LogProcessRepository;
