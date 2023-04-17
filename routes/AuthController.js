const express = require('express');
const passport = require('passport')
const router = express.Router();
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const LocalStrategy = require("passport-local").Strategy;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const otpModel = require("../models/Otp");
let representativeModel = require("../models/Representative");

const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { ObjectId } = require("mongodb");
const { Country, State, City } = require("country-state-city");
let axios = require("axios");
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIA3VH5X5YSX3KUF4DS ",
  secretAccessKey: "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",
  region: "us-east-2",
});
const sns = new AWS.SNS({ region: "us-east-2" });

require("dotenv").config();

router.get("/getCountryCodes", async (req, res) => {
  try {
    let countries = Country.getAllCountries().map((ele) => {
      return {
        name: ele.name,
        phoneNumberCode: ele.phonecode,
        isoCode: ele.isoCode,
      };
    });
    return res.status(200).send({ status: true, data: countries });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});


router.post('/getStatesOfCountry', async(req,res)=>{
  try {
    const {countryCode} = req.body;

      let States = State.getStatesOfCountry(countryCode);
      
      if(States && States.length > 0)
      {
          return res.json({status:200, msg:'success',data : States});
      }
      else
      {
          return res.json({status:400, msg:'no data found'});
      }
  } catch (error) {
      return res.json({status : 500 , msg:'internal server error'});
  }
})

router.post('/citiesOfStates', async(req,res)=> {
  try {
    const {countryCode, stateCode} = req.body;
    let Cities = City.getCitiesOfState(countryCode, stateCode);
    if(Cities && Cities.length > 0)
    {
        return res.json({status:200, msg:'success',data : Cities});
    }
    else
    {
        return res.json({status:400, msg:'failed'});
    }
} catch (error) {
    return res.json({status : 500 , msg:'internal server error'});
}
})

const checkToken = async (req, res) => {
  let token1 = req.header("Authorization");
  if (!token1)
    return res
      .status(400)
      .send({ status: false, message: "token must be present" });
  token1 = token1.split(" ");
  const token = token1[1];
  let decodedToken = jwt.verify(token, "nightclubapp");
  if (!decodedToken) {
    return res.status(403).send({ status: false, message: "Bad token" });
  }
  req.loggedUser = decodedToken.userId;
};

// router.get('/checkAuthenticated', checkToken);

router.post("/generateOTP", async (req, res) => {
  try {
    let { phoneNumberParam } = req.body;
    if (!phoneNumberParam) {
      return res.status(400).send({ status: false, message: "bad request" });
    }
    let numberValidation = await axios.get(
      `https://phonevalidation.abstractapi.com/v1/?api_key=96832543ded64bbd92d9bb974e2437d8&domain=https://phonevalidation.abstractapi.com/v1/api_key=96832543ded64bbd92d9bb974e2437d8&phone=${phoneNumberParam}`
    );
    // console.log(numberValidation.data);
    if (!numberValidation.data.valid) {
      return res
        .status(400)
        .send({ status: false, message: "invalid Phone number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    let issuedAtTime = Date.now();

    let expiryAt = issuedAtTime + 100000; //expiry of 100 seconds change to 300

    let otpInstance = {
      otp: otp,
      phoneNumber: phoneNumberParam,
      expiryAt: expiryAt,
    };
    console.log("otpInstance", otpInstance);
    //saving the OTP in DB
    let otpInDbInstance = await otpModel.findOneAndUpdate(
      { phoneNumber: phoneNumberParam },
      otpInstance,
      { upsert: true, new: true }
    );

    //trigger message throught aws --- not working yet
    // const params = {
    //   Message: `Your OTP is ${otp}`, // The message to send
    //   PhoneNumber: phoneNumberParam // The phone number to send the message to
    // };
    // console.log("====>>>>>", phoneNumberParam, "=====>>>>>", otp);

    // sns.publish(params, (err, data) => {
    //   if (err) {
    //     console.log(err); // Handle the error
    //   } else {
    //     console.log(data); // Handle the successful response
    //   }
    // });

    // triggering a SMS to client mobile using twillio
    // client.messages
    //   .create({
    //     body: `OTP is ${otp}`,
    //     messagingServiceSid: "MGc5765f4a412dff397d740dbf25710c27",
    //     to: '+16175300464',
    //   })
    //   .then((message) => console.log(message.sid))
    //   .done();

    return res
      .status(200)
      .send({ status: true, message: `otp is ${otp}`, data: otpInDbInstance });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

router.post("/verifyOtp", async (req, res) => {
  try {
    let { reqPhoneNumber, reqOtp } = req.body;
    if (!reqPhoneNumber) {
      return res.status(400).send({ status: false, message: "bad request" });
    }
    if (!reqOtp) {
      return res.status(400).send({ status: false, message: "bad request" });
    }

    //getting OTP data from DB to match with the OTP in request
    let otpFromDb = await otpModel
      .findOne({ phoneNumber: reqPhoneNumber })
      .select({ otp: 1, phoneNumber: 1, _id: 0, expiryAt: 1 });
    if (!otpFromDb)
      return res.status(400).send({ status: false, message: "OTP not found" });
    //need to add if null returned
    let timeTOExpiry = Number(Date.now()) - Number(otpFromDb.expiryAt);
    // console.log(timeTOExpiry , typeof timeTOExpiry);

    if (timeTOExpiry >= 0) {
      return res.status(400).send({ status: false, message: "Otp expired" });
    }
    if (otpFromDb.otp === reqOtp) {
      //user is verified and now proceed to check if the user is already existing
      //also check if user or representative
      let user;
      let secretString;
      if (req.body.isrepresentative) {
        user = await representativeModel.findOne({
          phoneNumber: reqPhoneNumber,
          isDeleted: false,
        });
        secretString = "nightclubappforrepresentative";
      } else {
        user = await User.findOneAndUpdate(
          { phoneNumber: reqPhoneNumber, isDeleted: false },
          { phoneNumber: reqPhoneNumber },
          { upsert: true, new: true }
        );
        secretString = "nightclubapp";
      }

      if (!user) {
        return res.status(400).send({
          status: false,
          message: "Registration failed. Please try again.",
        });
      } else {
        // allow user login and generate a token
        let userId = user._id;
        let token = jwt.sign({ userId: userId.toString() }, secretString);
        //will add expiry in the later stage of testing...
        return res.status(200).send({
          status: true,
          token: token,
          message: "user logged in!",
          data: user,
        });
      }
    }
    return res
      .status(403)
      .send({ status: false, message: "verification failed" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
});

// router.post("/register", async (req, res) => {
//   let firstNameParam = req.body.firstName;
//   let lastNameParam = req.body.lastName;
//   let genderParam = req.body.gender;
//   let emailParam = req.body.email;
//   let phoneNumberParam = req.body.phoneNumber;
//   let passwordParam = req.body.password;
//   let isIntermediarySetupParam = req.body.isIntermediarySetup;
//   try {
//     let registeredUser = await User.find({ email: emailParam });
//     if (registeredUser.length === 0) {
//       let hashedPassword = await Bcrypt.hash(passwordParam, 10);
//       let newUser = await User.create({
//         firstName: firstNameParam,
//         lastName: lastNameParam,
//         userName: null,
//         profilePhoto: null,
//         gender: genderParam,
//         email: emailParam,
//         isProfileSetup: false,
//         isIntermediarySetup: isIntermediarySetupParam,
//         instaHandle: null,
//         phoneNumber: phoneNumberParam,
//         password: hashedPassword,
//         role: null,
//       });
//       await newUser.save();
//       let token = await generateAccessToken(newUser.toObject());
//       let transporter = nodemailer.createTransport(
//         sendgridTransport({
//           auth: {
//             api_key: process.env.SENDGRID_APIKEY,
//           },
//         })
//       );
//       let mailOptions = {
//         from: "master@nighttable.co",
//         to: newUser.email,
//         subject: "Account Verification Link",
//         text:
//           "Hello " +
//           firstNameParam +
//           ",\n\n" +
//           "Please verify your account by clicking the link: \nhttp://" +
//           req.headers.host +
//           "/confirmation/" +
//           newUser.email +
//           "/" +
//           token +
//           "\n\nThank You!\n",
//       };
//       transporter.sendMail(mailOptions, function (error) {
//         if (error) {
//           return res.status(400).send({
//             message: "The provided registration information is not valid",
//           });
//         }
//         return res.status(200).send({
//           message:
//             "A verification email has been sent to " +
//             newUser.email +
//             ". It will be expire after one day. If you do not get the verification email, click on resend token.",
//         });
//       });
//     } else {
//       return res.status(400).send({
//         message: "The provided registration information is not valid",
//       });
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .send({ message: "The provided registration information is not valid" });
//   }
// });

// router.get("/successful/login", checkAuthenticated, async (req, res) => {
//   console.log("you successfully logged in");
// });

// router.post(
//   "/login/inhouse",
//   checkNotAuthenticated,
//   passport.authenticate("local", {
//     successRedirect: "api/auth/successful/login",
//     failureRedirect: "/api/auth/login/inhouse",
//     failureFlash: true,
//   })
// );

// router.post("/register", (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const gender = req.body.gender;
//   const email = req.body.email;
//   const phoneNumber = req.body.phoneNumber;
//   const password = req.body.password;
//   const isIntermediarySetup = req.body.isIntermediarySetup;

//   res.status(200).send();
// });

// function generateAccessToken(user) {
//   return Token.sign(user, process.env.AUTH_ACCESS_TOKEN_SECRET, {
//     expiresIn: "900s",
//   });
// }

// async function authenticateInhouse(user, passwordParam, res) {
//   try {
//     if (user.length === 0) {
//       return res.status(401).send({ message: "invalid information" });
//     }
//     const comparedResult = await Bcrypt.compare(
//       passwordParam,
//       user[0].password
//     );
//     if (comparedResult) {
//       const accessToken = await generateAccessToken(user[0].toJSON());
//       const refreshToken = Token.sign(
//         user[0].toJSON(),
//         process.env.AUTH_REFRESH_TOKEN_SECRET
//       );
//       const tokenObj = await RefreshToken.create({
//         serverRefreshToken: refreshToken,
//       });
//       await tokenObj.save();
//       return res.json({
//         isSetup: user[0].isProfileSetup,
//         firstName: user[0].firstName,
//         lastName: user[0].lastName,
//         serverAccessToken: accessToken,
//         serverRefreshToken: refreshToken,
//       });
//     } else {
//       return res.status(401).send({ message: "invalid information" });
//     }
//   } catch (error) {
//     return res.status(401).send({ message: "invalid information" });
//   }
// }

// async function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
// }

// async function checkNotAuthenticated(req, res) {
//   if (req.isAuthenticated()) {
//     return res.redirect("api/auth/successful/login");
//   }
//   const user = await User.find({ userName: req.body.userName });
//   passport.use(
//     new LocalStrategy(
//       { usernameField: "userName" },
//       authenticateInhouse(user, req.body.password, res)
//     )
//   );
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     const theUser = User.findById({ _id: new ObjectId(id) });
//     return done(null, theUser);
//   });
// }

module.exports = router;
