const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async signUp(user) {
        const { email } = user;
        console.log("service signUp " + user.email);
        const userExist = await _userService.getUserByUsername(email);
        if (userExist) {
            const error = new Error();
            error.status = 400;
            error.message = "User already exist";
            throw error;
        }

        return await _userService.create(user);
    }

    async signIn(user) {
        const { email, password } = user;
        console.log("service signin " + email);
        const userExist = await _userService.getUserByUsername(email);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "User does not exist";
            throw error;
        }

        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = "Invalid Password";
            throw error;
        }

        const userToEncode = {
            email: userExist.email,
            id: userExist._id,
        };

        const token = generateToken(userToEncode);

        return { token, user: userExist };
    }
}

module.exports = AuthService;