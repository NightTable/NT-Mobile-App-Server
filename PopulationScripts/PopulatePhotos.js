const Photo = require('../models/Photo');
const User = require('../models/User');

const populatePhotos = async () => {

    let dummyUserObject = await User.create({
        firstName: "Jack",
        lastName: "Smith",
        userName: "jacksmith",
        profilePhoto: "https://cache.legacy.net/legacy/images/cobrands/shreveporttimes/photos/SPT021686-1_20130820.jpgx?w=365&h=399&option=3",
        gender: "male",
        email: "jacksmith@email.com",
        gmail: null,
        isProfileSetup: true,
        facebookEmail: null,
        isIntermediarySetup: false,
        instaHandle: "@jacksmith",
        phoneNumber: 9384443333,
        password: "password",
        role: "consumer"
    });

    await dummyUserObject.save();

    let photoOne = await Photo.create({
        userId: dummyUserObject.id,
        imageUrl: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png'
    });

    await photoOne.save();

    let photoTwo = await Photo.create({
        userId: dummyUserObject.id,
        imageUrl: 'https://media.istockphoto.com/photos/orange-picture-id185284489?k=20&m=185284489&s=612x612&w=0&h=LLY2os0YTG2uAzpBKpQZOAC4DGiXBt1jJrltErTJTKI='
    });

    await photoTwo.save();


    let photoThree = await Photo.create({
        userId: dummyUserObject.id,
        imageUrl: 'https://media.istockphoto.com/photos/grape-dark-grape-grapes-with-leaves-isolated-with-clipping-path-full-picture-id803721418?k=20&m=803721418&s=612x612&w=0&h=U2vUEoYYZD6xdYJc-2dhZpa1EvIxkXdiUaAlE-Kexn4='
    });

    await photoThree.save();


    let photoFour = await Photo.create({
        userId: dummyUserObject.id,
        imageUrl: 'https://www.thespruceeats.com/thmb/ZnV1KFgs9UHKzDy1p8uMEZeALM4=/3004x3004/smart/filters:no_upscale()/MaraschinoCherries-5bce106546e0fb0051b70a88.jpg'
    });

    await photoFour.save();



};

exports.populatePhotos = populatePhotos; 
