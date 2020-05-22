let _authService = null;

class AuthController {
    constructor({ AuthService }) {
        _authService = AuthService;
    }

    async signUp(req, res) {
        const { body } = req;
        console.log("controller signUp " + body);
        const createdUser = await _authService.signUp(body);
        return res.status(201).send(createdUser);
    }

    async signIn(req, res) {
        const { body } = req;
        console.log("controller signIn " + body);
        const creds = await _authService.signIn(body);
        return res.send(creds);
    }

    async getUser(req, res) {
        console.log("controller signUp " + req);
        const createdUser = await _authService.getById(req.user.id);
        return res.status(201).send(createdUser);
    }
}

module.exports = AuthController;