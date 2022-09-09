const User = require('../models/User')
const { faker } = require('@faker-js/faker');

const populateUsers = async () => {
    
    for (let i = 0; i < 3; i++){
        let firstN = faker.name.firstName()
        let lastN = faker.name.lastName()
        let sexualOr = ((Math.floor(Math.random() * (2 - 1 + 1)) + 1) === 1?"male":"female")

        let user = await User.create({
            firstName: firstN,
            lastName: lastN,
            userName: firstN+lastN+"123",
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: sexualOr,
            email: firstN+lastN+"@gmail.com",
            gmail: null,
            isProfileSetup: true,
            facebookEmail: null,
            isIntermediarySetup: false,
            instaHandle: "@"+firstN+lastN,
            phoneNumber: Math.floor(Math.random() * (99999999999-1111111111)+1111111111),
            password: "password",
            role: "consumer"
        });
        await user.save()

    }
}
exports.populateUsers = populateUsers;

