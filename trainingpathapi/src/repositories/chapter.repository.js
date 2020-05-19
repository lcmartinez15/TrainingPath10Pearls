const BaseRepository = require("./base.repository");
let _chapter = null;
class ChapterRepository extends BaseRepository {
    constructor({ Chapter }) {
        super(Chapter);
        _chapter = Chapter;
    }
}

module.exports = ChapterRepository;