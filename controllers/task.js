const db = require('../models')
const Task = db.Task;
const User = db.User;
const nodemailer = require('nodemailer');
const constrants=require('../constrants')

exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: "Task title Can't be empty!" });
    }
    if (req.body._id) { //------- when we try to update
        Task.findByIdAndUpdate({ _id: req.body._id }, req.body)
            .then(data => {
                res.send({ message: `Title ' ${req.body.mobile}' Updated successfully!` });
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || "Data Not Found !!"
                });
            });
    }
    else {  //--------- insert case
        // console.log("req body:) ", req.body);
        const TaskObj = new Task({
            title: req.body.title, //---
            description: req.body.description,
            date: req.body.date,
            duration: req.body.duration,
            user_id: req.body.user_id,
            status: req.body.status,
        });
        TaskObj.save().then(data => {
            res.send(data);
            sendMail(data.user_id, data.title)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Data Not Found !!"
            });
        });
    }
};

//------------------------------------------------------------------ get all Tasks list 
exports.findAll = (req, res) => {
    Task.find().sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};


//------------------------------------------------------------------ get all Tasks list 
exports.findById = (req, res) => {
    // console.log("req.params", req.params, req.params._id)
    Task.find({ user_id: req.params._id }).sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        // console.log("error:", err)
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};


//------------------------get total  Tasks by id ------------------------------------------ 
exports.totalTaskFindById = (req, res) => {
    // console.log("req.params", req.params, req.params._id)
    Task.count({ user_id: req.params._id }).then(data => {
        res.send({ total: data });
    }).catch(err => {
        //console.log("error:", err)
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

const dt = new Date();
dt.setHours(dt.getHours() * 0)
dt.setMinutes(dt.getMinutes() * 0)

//------------------------get today total  Tasks by id ------------------------------------------ 
exports.todayTotalTaskFindById = (req, res) => {
    // //console.log("req.params today", req.params, req.params._id)
    Task.count({ $and: [{ user_id: req.params._id, createdAt: { $gt: new Date(dt) } }] }
    ).then(data => {
        res.send({ total: data });
    }).catch(err => {
        //console.log("error:", err)
        res.status(400).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

//------------------------------------------------------------------- Delete
exports.delete = (req, res) => {
    Task.deleteOne({ _id: req.params._id }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Data Not Found !!"
        });
    });
};

function sendMail(id, title) {
    User.findOne({ _id: id }).then(data => {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: constrants.userEmailId,
                pass: constrants.userEmailPassword
            }
        });

        let mailDetails = {
            from: constrants.userEmailId,
            to: data.emailId,
            subject: 'You have added new task ... OWN APP',
            text: title,
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                //console.log('Error Occurs');
                // return "Error Occurs"
            } else {
                //console.log('Email sent successfully');
                // return "Email sent successfully"
            }
        });
    })
}