const { generateToken } = require("../helpers/jwt.helper");
const { sendEmail } = require("../helpers/email-helper");

let _userService = null;
let _userRepository = null;


class AuthService {
    constructor({ UserService, UserRepository }) {
        _userService = UserService;
        _userRepository = UserRepository;
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
                "This user doesn´t exist";
            throw error;
        }
        if (userExist.status == "inactive") {
            const error = new Error();
            error.status = 404;
            error.message =
                "Inactive user";
            throw error;
        }

        const validPassword = userExist.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message =
                "Incorrect Password";
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


    async resetPassword(password,user){
        console.log("service", user);

        const currentUser= _userService.get(user);
        currentUser.password= password;
        currentUser.status = "active"

        const result= await _userService.update(user, currentUser);
        console.log(result);
        return await result;
    }
}

module.exports = AuthService;