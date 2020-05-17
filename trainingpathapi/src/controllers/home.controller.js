let _homeService = null;

class HomeCOntroller {
    constructor({ HomeService }) {
        _homeService = HomeService;
    }
    index(req, res) {
        return res.send(_homeService.index());
    }
}

module.exports = HomeCOntroller;