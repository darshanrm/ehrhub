const { validationResult } = require('express-validator');
const logger = require('../middlewares/logger');
const { users, tokens } = require('../models');
const { signAccessToken, signRefreshToken, encryptAccessToken } = require('../middlewares/jwt');
const ip = require('ip');

const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await users.findOne({
        where: {
            email: req.body.email
        }
    });

    

    if(user.password !== req.body.password){
        return res.status(400).json({ errors: "Invalid Password"})
    }

    // Signing AccessToken
    const accessToken = await signAccessToken(user);
    // Signing RefreshToken
    const { refreshToken, jti, exp } = await signRefreshToken();
    // Encrypting AccessToken
    const accessJWE = await encryptAccessToken(accessToken);
    
    
    // Inserting into Database
    // Check if the user is first time login
    const checkForToken = await tokens.findOne({
        where: {
            userId: user.id
        }
    });
    // User is not first Timer
    // So we need to revoke the previous tokens and assign them the new ones
    if(checkForToken){
        try{
            checkForToken.refreshToken = jti;
            checkForToken.expiry = new Date(exp*1000);
            await checkForToken.save();
        }
        catch(err){
            logger.error(`DBError while updating token entry`, err);
            
        }
        
    } else {
        // User is first time loggin in
        try{
            await tokens.create({
                userId: user.id,
                refreshToken: jti,
                expiry: new Date(exp*1000),
                createdByIp: ip.address()
            })
        }
        catch(err) {
            logger.error(`DBError while creating new entry for token`, err)
        }
    }

    res.cookie('token', accessJWE, {
        maxAge: 900000,
        secure: false,
        httpOnly: true
    }).json({
        message: "Login Successfully",
        refreshToken
    });


    logger.http(`POST | Login Request with email and password`, { 
        ip: req.ip,
        userId: user.id,
        tokens: {
            access: accessJWE,
            refresh: refreshToken
        }
    })

    
}

module.exports = {
    login
}