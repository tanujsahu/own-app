const { stringify } = require("querystring");

module.exports = mongoose => {
    const Reg = mongoose.model(
        "reg",
        mongoose.Schema(
            {
                name: String, //---
                emailId: String,
                verify: Boolean,
                mobile: String,
                age: String,
                address: String,
                password: String
            },
            { timestamps: true }
        )
    );
    return Reg;
};