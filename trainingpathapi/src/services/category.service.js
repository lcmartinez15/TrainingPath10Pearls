const BaseService = require("./base.service");
let _categoryRepository = null;

class CategoryService extends BaseService {
    constructor({ CategoryRepository }) {
        super(CategoryRepository);
        _categoryRepository = CategoryRepository;
    }

    async getAllCategories(pageSize, pageNum) {
        return await this.repository.getAllCategories(pageSize, pageNum);
    }
}

module.exports = CategoryService;