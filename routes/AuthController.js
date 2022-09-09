const express = require('express');
const router = express.Router();
const Bcrypt = require('bcrypt');
const Token = require('jsonwebtoken');
const User = require("../models/User");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv').config()



router.post ('/register', async (req, res) => {
    let firstNameParam = req.body.firstName;
    let lastNameParam = req.body.lastName;
    let genderParam = req.body.gender;
    let emailParam = req.body.email;
    let phoneNumberParam = req.body.phoneNumber;
    let passwordParam = req.body.password;
    let isIntermediarySetupParam = req.body.isIntermediarySetup;
    try {
        let registeredUser = await User.find({email: emailParam});
        if (registeredUser.length === 0){
            let hashedPassword = await Bcrypt.hash(passwordParam, 10);
            let newUser = await User.create({
                firstName: firstNameParam,
                lastName: lastNameParam,
                userName: null,
                profilePhoto: null,
                gender: genderParam,
                email: emailParam,
                isProfileSetup: false,
                isIntermediarySetup: isIntermediarySetupParam,
                instaHandle: null,
                phoneNumber: phoneNumberParam,
                password: hashedPassword,
                role: null,
            });
            await newUser.save();
            let token = await generateAccessToken(newUser.toJSON());
            let transporter =  nodemailer.createTransport(
                sendgridTransport({
                    auth: {
                        api_key: process.env.SENDGRID_APIKEY
                    }
                })
            )
            let mailOptions = { from: 'master@nighttable.co', to: newUser.email, subject: 'Account Verification Link', text: 'Hello '+ firstNameParam +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.email + '\/' + token + '\n\nThank You!\n'}
            transporter.sendMail(mailOptions, function(error) {
                if (error){
                    return res.status(400).send({message: "The provided registration information is not valid"})
                }
                return res.status(200).send({message: 'A verification email has been sent to ' + newUser.email + '. It will be expire after one day. If you do not get the verification email, click on resend token.'});
            })
        }
        else{
            return res.status(400).send({message: "The provided registration information is not valid"});
        }


    } catch (error) {
        return res.status(400).send({message: "The provided registration information is not valid"});
    }

});
router.post('/login/inhouse', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);

    res.status(200).send();

});

router.post('/register', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const isIntermediarySetup = req.body.isIntermediarySetup;

    res.status(200).send();

});

async function generateAccessToken(user){
    return Token.sign(user, process.env.AUTH_ACCESS_TOKEN_SECRET, { expiresIn: '900s' })
}

module.exports = router;
