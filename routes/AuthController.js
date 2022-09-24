const express = require('express');
const router = express.Router();
const Token = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initializePassport = require('../passport-config');


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

router.post('/login/inhouse', async (req, res) => {

    const userNameParam = req.body.userName;
    const passwordParam = req.body.password;
    initializePassport(passport, userNameParam, passwordParam)
    try {
        const user = await User.find({ userName: userNameParam });
        if (user.length === 0){
            return res.status(401).send({message: "invalid information" });
        }
        const comparedResult = await Bcrypt.compare(passwordParam, user[0].password);
        if (comparedResult){
            const accessToken = await generateAccessToken(user[0].toJSON());
            const refreshToken = Token.sign(user[0].toJSON(), process.env.AUTH_REFRESH_TOKEN_SECRET);
            const tokenObj = await RefreshToken.create({
                serverRefreshToken: refreshToken
            });
            await tokenObj.save();
            return res.json({isSetup: user[0].isProfileSetup, firstName: user[0].firstName, lastName: user[0].lastName,serverAccessToken: accessToken, serverRefreshToken: refreshToken});
        }
        else{
            return res.status(401).send({message: "invalid information" });
        }

    } catch (error) {
        return res.status(401).send({message: "invalid information" });
    }

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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

module.exports = router;
