const config = require("../config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.mongoUrl;
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database! ");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

db.Reg = require("../models/reg.model.js")(mongoose);
db.User = require("../models/user.js")(mongoose);
db.Task = require("../models/task.js")(mongoose);
db.Event = require("../models/event.js")(mongoose);
db.Query = require("../models/query.js")(mongoose);

module.exports = db;