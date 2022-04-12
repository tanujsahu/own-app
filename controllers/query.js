const db = require('../models');
const Query = db.Query;
const User = db.User;

exports.create = (req, res) => {
    console.log("data::", req.body)
    if (req.body._id) { //------- when we try to update
        Query.findOne({ _id: req.body._id }).then(obj => {
            req.body.answerList = obj.answerList.concat(req.body.answerList)
            Query.findByIdAndUpdate({ _id: req.body._id }, req.body)
                .then(data => {
                    res.send({ message: `Answer Updated successfully!` });
                })
                .catch(err => {
                    res.status(400).send({
                        message: err.message || "Data Not Found !!"
                    });
                });
        })
    }
    else {
        const QueryObj = new Query({
            query: req.body.query, //---
            queryType: req.body.queryType,
            answerList: req.body.answerList,
            ans_user_id: req.body.ans_user_id,
            ans_dateTime: req.body.ans_dateTime,
            answer: req.body.answer,
            user_id: req.body.user_id,
        });
        QueryObj.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(400).send({
                message: err.message || "Data Not Found !!"
            });
        });
    }
}

exports.findAll = (req, res) => {
    Query.find().populate({ model: 'user', path: 'user_id', select: 'name -_id' }).sort({ _id: -1 }).then(data => {
        console.log("Populated data::)", data);
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Data Not Found !!"
        });
    });
}

exports.getByUserId = (req, res) => {
    // console.log("user_id", req.params)
    Query.find({ user_id: req.params._id }).sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Data Not Found !!"
        });
    });
}

exports.getById = (req, res) => {
    // console.log("user_id", req.params)
    Query.findOne({ _id: req.params._id }).populate({ model: 'user', path: 'answerList.ans_user_id', select: 'name' }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Data Not Found !!"
        });
    });
}