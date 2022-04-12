const { stringify } = require("querystring");

module.exports = mongoose => {
    const event = mongoose.model(
        "event",
        mongoose.Schema(
            {
                title: String, //---
                description: String,
                date: Date,
                user_id: String,
                eventType: String, //----- public - private
            },
            { timestamps: true }
        )
    );
    return event;
};