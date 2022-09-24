// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

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
