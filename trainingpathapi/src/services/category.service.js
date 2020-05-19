const BaseService = require("./base.service");
let _categoryRepository = null;

class CategoryService extends BaseService {
    constructor({ CategoryRepository }) {
        super(CategoryRepository);
        _categoryRepository = CategoryRepository;
    }
}

module.exports = CategoryService;