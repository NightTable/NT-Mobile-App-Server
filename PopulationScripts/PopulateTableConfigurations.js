  

const TableConfig = require('../models/TableConfiguration');
const Club = require('../models/Club')
const User = require('../models/User')
const Region = require('../models/Region')
const { faker } = require('@faker-js/faker');

const populateTableConfigurations = async () => {

    for (let i = 0; i < 4; i++){

        const tableConfigs = ['floor', 'dj', 'standing', 'owner'];
        const clubNames = ['The Grand', 'Mariel', 'Story', 'LIV']
        let indexTC = i;
        let indexClub = i;
        let indexGender = Math.floor(Math.random() * 2);
        let pricePoint = Math.floor(Math.random() * (10000-1000)+1000);
        let sizing = Math.floor(Math.random() * (20-5)+5);
        let availablity = Math.floor(Math.random() * (20-5)+5);

        let region = await Region.create({
            cityArea: faker.address.city(),
            referenceLat: Math.floor(Math.random() * (91-(-90))+(-90)),
            referenceLong: Math.floor(Math.random() * (181-(-180))+(-180)),
        })
        await region.save()

        let genders = ['male', 'female']
        let fname = faker.name.firstName();
        let lname = faker.name.lastName();
        let user = await User.create({
            firstName: fname,
            lastName: lname,
            userName: fname+lname+123,
            profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
            gender: genders[indexGender],
            isProfileSetup: true,
            isIntermediarySetup: false,
            instaHandle: "@"+fname+lname,
            phoneNumber: Math.floor(Math.random() * (99999999999-1111111111)+1111111111),
            password: "password",
            role: "consumer"
        })
        await user.save()

        let club = await Club.create({
            name: clubNames[indexClub],
            latitude: Math.floor(Math.random() * (91-(-90))+(-90)),
            longitude: Math.floor(Math.random() * (181-(-180))+(-180)),
            instaHandle: '@'+clubNames[indexClub],
            phoneNumber: Math.floor(Math.random() * (99999999999-1111111111)+1111111111),
            address: faker.address.streetAddress(),
            regionId: region.id,
            userId: user.id
        })
        await club.save()

        let tc = await TableConfig.create({
            type: tableConfigs[indexTC],
            price: pricePoint,
            size: sizing,
            availabilityCount: availablity,
            clubId: club.id
        })
        await tc.save();
        
    }
}
exports.populateTableConfigurations = populateTableConfigurations;
