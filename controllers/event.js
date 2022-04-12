const db = require('../models')
const Event = db.Event;
const nodemailer = require('nodemailer');
const constrants =require('../constrants')

exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: "Event title Can't be empty!" });
    }
    if (req.body._id) { //------- when we try to update
        Event.findByIdAndUpdate({ _id: req.body._id }, req.body)
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
        // //console.log("req body:) ", req.body);
        const EventObj = new Event({
            title: req.body.title, //---
            description: req.body.description,
            date: req.body.date,
            user_id: req.body.user_id,
            eventType: req.body.eventType,
        });
        EventObj.save().then(data => {
            res.send(data);
            sendMail(data.user_id, data.title)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Data Not Found !!"
            });
        });
    }
};

//------------------------------------------------------------------ get all Events list 
exports.findAll = (req, res) => {
    Event.find().sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

// const dt = new Date(); dt.setHours(dt.getHours() * 0); dt.setMinutes(dt.getMinutes() * 0); dt.setSeconds(dt.getSeconds() * 0)
// const oldDt = new Date(); oldDt.setDate(oldDt.getDate() - 2);
// //console.log("dt,,,,oldDt", dt, oldDt)
// Event.find({ $and: [{ eventType: 'private' }] }).then(data => {
//     //console.log("Event::)", data,dt);
//     // res.send(data)
// });

exports.findAllbyType = (req, res) => {
    //console.log("body:", req.body)
    if (req.body.eventType == 'private') {
        Event.find({ eventType: 'private', date: new Date() }).then(data => {
            //console.log("Event::)", data);
            res.send(data)
        }).catch(err => {
            //console.log("error:", err)
            res.status(400).send({ message: err })
        })
    }
    else if (req.body.eventType == 'public') {
        Event.find({ eventType: 'public' }).populate({ model: 'user', path: 'user_id', select: 'name' }).then(data => {
            //console.log("Event:::)", data);
            res.send(data);
        }).catch(err => {
            //console.log("error:", err)
            res.status(400).send({ message: err });
        })
    }
}

//------------------------------------------------------------------ get all Events list 
exports.findById = (req, res) => {
    // //console.log("req.params", req.params, req.params._id)
    Event.find({ user_id: req.params._id }).sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        // //console.log("error:", err)
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};


//------------------------------------------------------------------- Delete
exports.delete = (req, res) => {
    Event.deleteOne({ _id: req.params._id }).then(data => {
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
            subject: 'You have added new Event ... OWN APP',
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