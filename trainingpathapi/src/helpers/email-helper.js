const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async function(email, id, token) {
    try {
        const clientUrl = "http://localhost:3000/";
        console.log("send email");
        let mailOptions = {
            from: "lcmartinez15@gmail.com",
            to: email,
            subject: "Reset your account password",
            text: "and easy to do anywhere, even with Node.js",
            html: "<h4><b>Reset Password</b></h4>" +
                "<p>Your account to 10Pearls Training Path was successfully created. Please click the following link to assign your password</p>" +
                "<a href=" +
                clientUrl +
                "reset/" +
                id +
                "/" +
                token +
                '">' +
                clientUrl +
                "reset/" +
                id +
                "/" +
                token +
                "</a>" +
                "<br><br>" +
                "<p>--Team</p>",
        };

        await sgMail.send(mailOptions).catch((e) => {
            console.log("That did not go well." + e);
            throw e;
        });
    } catch (error) {
        console.log(error);
    }
};