const LocalStrategy = require('passport-local').Strategy
const Bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const Token = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken')

function initializeInHouse(passport, getUserByUsername, getUserByPassword) {
  const authenticateUser = async (username, password, done) => {
    const user = await User.find({ userName: username })
    if (user.length === 0){
        return res.status(401).send({message: "invalid information" });
    }

    try {
        const comparedResult = await Bcrypt.compare(password, user[0].password);
        if (comparedResult) {
            const accessToken = await generateAccessToken(user[0].toJSON());
            const refreshToken = Token.sign(user[0].toJSON(), process.env.AUTH_REFRESH_TOKEN_SECRET);
            const tokenObj = await RefreshToken.create({
                serverRefreshToken: refreshToken
            });
            await tokenObj.save();
            return res.json({isSetup: user[0].isProfileSetup, firstName: user[0].firstName, lastName: user[0].lastName,serverAccessToken: accessToken, serverRefreshToken: refreshToken});
        } else {
            return res.status(401).send({message: "invalid information"});
        }
    } catch (error) {
        return res.status(401).send({message: "invalid information" });
    }
  }



  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return res.json({userId: user.id})
  })
}
module.exports = initializeInHouse;
