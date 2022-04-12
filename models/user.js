const { stringify } = require("querystring");

module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: String, //---
                emailId: String,
                verify: Boolean,
                otp: String,
                mobile: String,
                age: String,
                address: String,
                password: String,
                designation: String,
                status: Boolean, //------ true: enable   false: Disable
            },
            { timestamps: true }
        )
    );
    return User;
};

