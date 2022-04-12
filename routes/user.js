module.exports = app => {
    const user = require("../controllers/user.js");
    var router = require("express").Router();

    router.post("/", user.create);

    router.get("/", user.findAll);

    router.post("/findById", user.findById);

    router.post("/verify", user.verify);

    router.post("/forgot", user.forgot);

    router.post("/login", user.login);

    router.delete("/:_id", user.delete);

    router.get("/checkId/:_id", user.checkId);

    app.use('/api/user', router);
};