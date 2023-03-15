  

const RefreshToken = require('../models/RefreshToken');

const ObjectId = require('mongodb').ObjectId;

const populateRefreshTokens = async () => {


    for (let i = 0; i < 10; i++) {

        let refreshToken = await RefreshToken.create({
            id: new ObjectId()
        });
    
        await refreshToken.save();
    }
    
}

exports.populateRefreshTokens = populateRefreshTokens;
