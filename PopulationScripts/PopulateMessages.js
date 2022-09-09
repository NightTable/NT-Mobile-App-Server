const User = require('../models/User')
const Message = require('../models/Message')
const MessageChat = require('../models/MessageChat')
const { faker } = require('@faker-js/faker');

const populateMessages = async () => {
    
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

        let user2 = await User.create({
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
        await user2.save()

        let read = true;
        if (Math.floor(Math.random() * 2) == 0){
            read = true;
        }
        else{
            read = false;
        }

        let messageChat = await MessageChat.create({
            sourceUserId: user2.id,
            targetUserId: user.id,
            isUnRead: read,
            lastMessage: "this is the last message",
            isSourceDeleted: !read,
            isTargetDeleted: !read,

        })
        await messageChat.save()

        let message = await Message.create({
            messageChatId: messageChat.id,
            userId: user.id,
            createdAt: Date.now(),
            content: "this is the message content"
        })
        await message.save()


    }
}
exports.populateMessages = populateMessages;

