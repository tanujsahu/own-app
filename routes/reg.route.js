module.exports = app => {
    const reg = require("../controllers/reg.controller.js");
    var router = require("express").Router();

    router.post("/", reg.create);

    router.get("/", reg.findAll);

    router.post("/verify", reg.verify);

    router.post("/login", reg.login);

    router.delete("/:_id", reg.delete);

    app.use('/api/reg', router);
};