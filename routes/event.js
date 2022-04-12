module.exports = app => {
    const event = require("../controllers/event.js");
    var router = require("express").Router();

    router.post("/", event.create);

    router.get("/", event.findAll);

    router.get("/findById/:_id", event.findById);

    router.post("/findAllbyType", event.findAllbyType);

    router.delete("/:_id", event.delete);

    app.use('/api/event', router);
};