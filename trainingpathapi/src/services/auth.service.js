const { generateToken } = require("../helpers/jwt.helper");
const { sendEmail } = require("../helpers/email-helper");

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
        //send email
        user.password = "Temporal01";
        user.status = "inactive";
        var newUser = await _userService.create(user);

        const userToEncode = {
            email: newUser.email,
            id: newUser.id,
        };
        const token = generateToken(userToEncode);
        await sendEmail(newUser.email, newUser.id, token);

        return newUser;
    }

    async signIn(user) {
        const { email, password } = user;
        console.log("service signin " + email);
        const userExist = await _userService.getUserByUsername(email);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message =
                "The fields entered does not match in our records, please validate and try again";
            throw error;
        }
        if (userExist.status == "inactive") {
            const error = new Error();
            error.status = 404;
            error.message =
                "The fields entered does not match in our records, please validate and try again";
            throw error;
        }

        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message =
                "The fields entered does not match in our records, please validate and try again";
            throw error;
        }

        const userToEncode = {
            email: userExist.email,
            id: userExist._id,
        };

        const token = generateToken(userToEncode);

        return { token, user: userExist };
    }

    async getById(id) {
        console.log("service signin " + id);
        return await _userService.get(id);
    }
}

module.exports = AuthService;