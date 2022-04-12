const db = require("../models");
const { format } = require("path");
const mongoose = require("mongoose");
// const config = require('../config.js');
// const msg = require(`../lang/${config.lang}.json`);
const Reg = db.Reg;
const constrants =require('../constrants')
const nodemailer = require('nodemailer');
const Mail = require("nodemailer/lib/mailer");

exports.create = (req, res) => {
    // console.log("Body:", req.body)
    if (!req.body.name) {
        return res.status(400).send({ message: "User Name Can't be empty!" });
    }
    if (req.body._id) {
        Reg.findOne({ 
            mobile: req.body.mobile,
            _id: { $ne: req.body._id }
        }).then(Reg => {
            if (Reg) {
                return res.status(500).send({ message: `mobile '${req.body.mobile}' already in Use!` });
            }
            Reg.findByIdAndUpdate({ _id: req.body._id }, req.body)
                .then(data => {
                    res.send({ message: `mobile ' ${req.body.mobile}' Updated successfully!` });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Data Not Found !!"
                    });
                });
        });
    } else {
        Reg.findOne({ mobile: req.body.mobile }).then(reg => {
            if (reg) {
                console.log("mobile already exists", req.body);
                return res.status(500).send({ message: `mobile '${req.body.mobile}' already exists!` });
            }
            console.log("req body:) ", req.body);
            const RegObj = new Reg({
                name: req.body.name,
                emailId: req.body.emailId,
                verify: req.body.verify,
                mobile: req.body.mobile,
                age: req.body.age,
                address: req.body.address,
            });
            RegObj.save()
                .then(data => {
                    res.send(data);
                    sendMail(req.body.emailId, data._id)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Data Not Found !!"
                    });
                });
        });
    }

};

//-------------- verify user -------
exports.verify = (req, res) => {
    console.log("Email verify data", req.body, req.body._id)
    if (req.body._id) {
        // req.body.verify = true;
        Reg.findByIdAndUpdate({ _id: req.body._id }, req.body)
            .then(data => {
                console.log("Email verify success", data)
                res.send({ message: `your email verify successfully!` });
            })
            .catch(err => {
                console.log("Email verify some error");
                res.status(500).send({ message: err.message || "Data Not Found !!" });
            });
    }
    else {
        res.status(500).send("Crediantial not match !!");
    }
}

// Reg.findOne({ _id: '6219bf09fs96a46d551ef0d0f' }).then(obj => {
//     console.log("Login success", obj);
// },error=>{
//     console.log("login Some Error", error.error || 'Data Not Match');
// }).catch(error => {
//     console.log("catch login Some Error", error.error || 'Data Not Match');
//     // res.status(500).send({ message: err.message || "Data Not Found !!" });
// });

//-------------- Login ----------------------------------
exports.login = (req, res) => {
    console.log("login after verify ", req.body)
    if (req.body.emailId) {
        console.log("enter 1 step");
        Reg.findOne({ emailId: req.body.emailId, password: req.body.password }).then(obj => {
            console.log("enter email step 2", obj);
            if (obj) {
                if (obj.verify) {
                    console.log("Login success");
                    res.send({ message: `login successfully!` });
                }
                else {
                    console.log("your email is not verify ");
                    res.status(500).send({ message: 'EmailId is not verify !' });
                }
            }
            else {
                console.log("your email is not verify ");
                res.status(500).send({ message: 'EmailId and password not match !' });
            }
        }, err => {
            console.log('emailId and password not match !');
            res.status(500).send({ message: 'EmailId and password not match !' });
        }).catch(err => {
            console.log("Catch Data Not Match", err.message);
            res.status(500).send({ message: err.message || "Data Not Found !!" });
        });
    }
    else {
        res.status(500).send("Crediantial not match !!");
    }
}

//------------------------------------------------------------------ get all users list 
exports.findAll = (req, res) => {
    Reg.find().sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

//------------------------------------------------------------------- Delete
exports.delete = (req, res) => {
    Reg.deleteOne({ _id: req.params._id }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Data Not Found !!"
        });
    });
};


//allow to less secure your account :-
////---------- https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4N76c4fkxEmIXhxAGTja__aUfjkfpoJN3YTb0JJbz63SZ0VlYTgj9iO2NtnxOBLefQ_M8cGu1mIjPRqpGoaDeyqPx4NVQ
function sendMail(email, id) {
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
        to: email,
        subject: 'Test mail for verify your email' + id,
        text: 'Node.js testing mail for SIT',
        html: `<b>Verify Your Email</b>  <a href='http://192.168.8.62:5200/#/users/verify?${id}'>Click here to verify<i>`, // html body
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            // return "Error Occurs"
        } else {
            console.log('Email sent successfully');
            // return "Email sent successfully"
        }
    });
}