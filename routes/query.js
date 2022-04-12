module.exports = app => {
    const query = require("../controllers/query.js");
    var router = require("express").Router();

    router.post("/", query.create);
    router.get("/getByUserId/:_id", query.getByUserId);
    router.get("/getById/:_id", query.getById);
    router.get("/", query.findAll);

    app.use('/api/query', router);
}


