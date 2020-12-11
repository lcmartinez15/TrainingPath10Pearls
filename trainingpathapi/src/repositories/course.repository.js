const BaseRepository = require("./base.repository");
let _course = null;
class CourseRepository extends BaseRepository {
  constructor({ Course }) {
    super(Course);
    _course = Course;
  }

  async getAllCourses() {
    return await _course.find({ isDeleted: false }).populate("category");
  }
  async getCoursesByCategory() {
    const res = await _course.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$category", total: { $sum: 1 } } },
      {
        $lookup: {
          from: "category",
          localField: "category",
          foreignField: "_id",
          as: "categoryId",
        },
      },
    ]);

    return res;
  }
}

module.exports = CourseRepository;
