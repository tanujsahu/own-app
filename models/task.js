const { stringify } = require("querystring");

module.exports = mongoose => {
    const Task = mongoose.model(
        "task",
        mongoose.Schema(
            {
                title: String, //---
                description: String,
                date: Date,
                duration: String,
                user_id: String,
                status: String,
            },
            { timestamps: true }
        )
    );
    return Task;
};