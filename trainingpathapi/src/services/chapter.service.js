const BaseService = require("./base.service");
let _chapterRepository = null;

class ChapterService extends BaseService {
    constructor({ ChapterRepository }) {
        super(ChapterRepository);
        _chapterRepository = ChapterRepository;
    }
}

module.exports = ChapterService;