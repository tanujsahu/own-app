const db = require("../models");
const User = db.User;
const nodemailer = require('nodemailer');
const config = require('../config')
const base_url_ip = config.base_url_ip;
const constrants = require('../constrants')
console.log("base_url_ip::))))", constrants.userEmailId);

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "User Name Can't be empty!" });
    }
    if (req.body._id) {
        User.findOne({
            mobile: req.body.mobile,
            _id: { $ne: req.body._id }
        }).then(User => {
            if (User) {
                return res.status(500).send({ message: `mobile '${req.body.mobile}' already in Use!` });
            }
            User.findByIdAndUpdate({ _id: req.body._id }, req.body)
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
        User.findOne({ $or: [{ mobile: req.body.mobile }, { emailId: req.body.emailId }] }).then(obj => {
            if (obj) {
                return res.status(400).send({ message: `User  already exists!` });
            }
            //console.log("req body:) ", req.body);
            const UserObj = new User({
                name: req.body.name,
                emailId: req.body.emailId,
                verify: req.body.verify,
                mobile: req.body.mobile,
                age: req.body.age,
                address: req.body.address,
                password: req.body.emailId + '#ownapp',
                designation: req.body.designation,
            });
            UserObj.save()
                .then(data => {
                    res.send(data);
                    sendMail(req.body.emailId, data._id, data.password)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Data Not Found !!"
                    });
                })

        });
    }
};

//-------------- verify user -------
exports.verify = (req, res) => {
    //console.log("Email verify data", req.body, req.body._id)
    if (req.body._id) {
        User.findByIdAndUpdate({ _id: req.body._id }, req.body)
            .then(data => {
                //console.log("Email verify success", data)
                res.send({ message: `your email verify successfully!` });
            })
            .catch(err => {
                //console.log("Email verify some error");
                res.status(500).send({ message: err.message || "Data Not Found !!", message1: 'Email not verify some error' });
            });
    }
    else {
        res.status(500).send("Crediantial not match !!");
    }
}

// forgot password ----------------------
exports.forgot = (req, res) => {
    // update new password
    if (req.body.fnName == 'setPwd') {
        User.findOne({ emailId: req.body.emailId }).then(data => {
            if (data) {
                User.findByIdAndUpdate({ _id: data._id }, req.body).then(data => {
                    res.status(200).send({ message: 'Set new password succesfully' });
                })
            }
            else {
                res.status(400).send({ message: 'Email Not match' });
            }
        })
    }
    // match otp 
    else if (req.body.fnName == 'matchOtp') {
        User.findOne({ emailId: req.body.emailId, otp: req.body.otp }).then(data => {
            if (data) {
                res.status(200).send({ message: 'OTP match' });
            }
            else {
                res.status(400).send({ message: 'OTP not match' });
            }
        });
    }
    // send otp after match email 
    else if (req.body.fnName == 'sendOtp') {
        User.findOne({ emailId: req.body.emailId }).then(data => {
            if (data) {
                User.findByIdAndUpdate({ _id: data._id }, req.body).then(data1 => {
                    sendMailForOtp(data.emailId, req.body.otp);
                    res.status(200).send({ message: 'OTP send on your email' });
                })
            }
            else {
                res.status(400).send({ message: 'Email Not match' });
            }
        }).catch(err => {
            res.status(400).send({ message: err });
        })
    }
}

//-------------- Login ----------------------------------
exports.login = (req, res) => {
    //console.log("login after verify ", req.body)
    if (req.body.userId) {
        //console.log("enter 1 step");
        User.findOne({ emailId: req.body.userId, password: req.body.pwd }).then(obj => {
            //console.log("enter email step 2", obj);
            if (obj) {
                if (obj.verify) {
                    //console.log("Login success");
                    res.send({ message: `login successfully!`, data: obj });
                }
                else {
                    //console.log("your email is not verify ");
                    res.status(400).send({ message: 'EmailId is not verify !' });
                }
            }
            else {
                //console.log("your email is not verify ");
                res.status(400).send({ message: 'EmailId and password not match !' });
            }
        }, err => {
            //console.log('emailId and password not match !');
            res.status(500).send({ message: 'EmailId and password not match !' });
        }).catch(err => {
            //console.log("Catch Data Not Match", err.message);
            res.status(500).send({ message: err.message || "Data Not Found !!" });
        });
    }
    else {
        res.status(400).send({ message: "Crediantial not match !!" });
    }
}

//------------------------------------------------------------------ get all users list 
exports.findAll = (req, res) => {
    User.find().sort({ _id: -1 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

//------------------------------------------------------------------ get all users list 
exports.findById = (req, res) => {
    //console.log("user/findById", req.body)
    User.findOne({ _id: req.body._id }).then(data => {
        //console.log("user/findById", data)
        res.send(data);
    }).catch(err => {
        //console.log("error:", err)
        res.status(500).send({
            message: err.message || "Data Not Found !!"
        });
    });
};

//------------------------------------------------------------------- Delete
exports.delete = (req, res) => {
    User.deleteOne({ _id: req.params._id }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Data Not Found !!"
        });
    });
};

//------------------------------------------------------------------- Delete
exports.checkId = (req, res) => {
    User.find({ _id: req.params._id }).then(data => {
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
function sendMail(email, id, pass) {
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
        subject: 'Test mail for verify your email',
        text: 'Node.js testing mail for SIT',
        html: `<b>Verify Your Email</b>  <a href='${base_url_ip}verify?${id}'>Click here to verify<i> <br/> <br/> <br/>
        <div> <b>userId :</b> ${email} <br/> <b>Password :</b> ${pass} </div>`, // html body
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
}
// send mail for sendinmg otp ---------------------
function sendMailForOtp(email, otp) {
    //console.log("email,otp:::)", email, otp)
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
        subject: 'Do Not Share Your OTP',
        text: `Your OTP IS : ${otp}`,
        html: `<b>Do Not Share Your OTP</b> Your OTP IS : ${otp}`
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
}