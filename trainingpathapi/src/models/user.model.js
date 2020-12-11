const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
const gravatar = require("gravatar");

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

UserSchema.method.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password) {
    return compareSync(password, this.password);
};

UserSchema.pre("save", async function(next) {
    console.log("hook save user" + this);
    const user = this;

    const avatar = gravatar.url(user.email, {
        s: "200",
        r: "pg",
        d: "mm",
    });

    user.avatar = avatar;

    if (!user.isModified("password")) {
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

UserSchema.pre("findOneAndUpdate", async function(next) {
    console.log("hook update user" + this);
    const user = this;

    console.log(" user" + this._update.status);
   


    const salt = genSaltSync(10);
    const hashedPassword = hashSync(this._update.password, salt);
    this._update.password= hashedPassword;
    console.log("updated password");
    next();
});

module.exports = mongoose.model("user", UserSchema);