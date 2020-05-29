const BaseRepository = require("./base.repository");
let _category = null;
class CategoryRepository extends BaseRepository {
    constructor({ Category }) {
        super(Category);
        _category = Category;
    }

    async getAllCategories() {
        return await _category.find({ isDeleted: false });
    }
}

module.exports = CategoryRepository;