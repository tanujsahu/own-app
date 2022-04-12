module.exports = app => {
    const task = require("../controllers/task.js");
    var router = require("express").Router();

    router.post("/", task.create);

    router.get("/", task.findAll);

    router.get("/findById/:_id", task.findById);

    router.get("/totalTaskById/:_id", task.totalTaskFindById);

    router.get("/todayTotalTaskById/:_id", task.todayTotalTaskFindById);

    router.delete("/:_id", task.delete);

    app.use('/api/task', router);
};