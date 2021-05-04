const { validationResult } = require('express-validator');
const { verifyRefreshToken, signAccessToken, signRefreshToken, encryptAccessToken } = require('../middlewares/jwt');
const { tokens,used_tokens } = require('../models');
const ip = require('ip');
const logger = require('../middlewares/logger');

const refresh = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const reqToken = req.body.token;
    const verifyResult = await verifyRefreshToken(reqToken);
    if(verifyResult === null){
        return res.status(400).json({ errors: "Invalid Token provided, Please try to login again"})
    }
    const { result } = verifyResult;
    const tokenEntry = await tokens.findOne({ where: { refreshToken: result.payload.jti }});

    // If Token entry is found then check for exp and grant new tokens
    // Else check further in the used_tokens table

    if(tokenEntry){
        var expDate = Math.round((new Date(tokenEntry.expiry)).getTime() / 1000);
        // Check that expiration date hadn't been fabcricated
        if(expDate !== result.payload.exp){
            // Date is changed by a potential attacker
            // Delete the entry in tokens for this particular user and also make an entry inside the used_tokens table 
            try{
                await tokens.destroy({
                    where: {
                        userId: tokenEntry.userId
                    }
                })
                await used_tokens.create({
                    tokenId: result.payload.jti,
                    userId: tokenEntry.userId,
                    userIp: req.ip,
                    userBan: true
                })
            }catch(err) {
                logger.error(`DBError | While updating`, err)
                return res.status(500).json({ errors: 'Internal server error'})
            }
            // mentioning this user as blacklisted for further investigation
            // Also request the user to authenticate again 
            return res.status(501).json({ errors: "Your Token is tampered, This action is reported at our servers.. Please login again"})
        }

        // Date is not changed
        // Sign new accessToken and refreshToken for user
        const accessToken = await signAccessToken();

        const accessJWE = await encryptAccessToken(accessToken);

        const { refreshToken, jti, exp} = await signRefreshToken();

        // Update the tokens and used_tokens table accordingly

        try{
            await tokens.update({
                refreshToken: jti,
                expiry: new Date(exp*1000),
                createdIp: ip.address(),
            }, {
                where: {
                    userId: tokenEntry.userId
                }
            });
            await used_tokens.create({
                tokenId: result.payload.jti,
                userId: tokenEntry.userId,
                userIp: req.ip,
            });

        }catch(err){
            console.log(err)
        }

        logger.http(`POST | Session Refresh Request`, {
            ip: req.ip,
            userId: tokenEntry.userId
        });
        return res.cookie('token', accessJWE, {
            maxAge: 90000,
            secure: false,
            httpOnly: true
        }).json({
            message: "Session Refreshed Successfully",
            refreshToken
        });
        

    } else{
        // Not Found the tokens table
        // Check in the used_token Table
        const usedTokenCheck = await used_tokens.findOne({ where: { tokenId: result.payload.jti }});
        if(usedTokenCheck){
        // If found There has been attack to the user of refreshToken getting stolen 
        // Report this further 
        // Revoke all the tokens access and refresh both
        // refresh tokens can be revoked by deleting the user record in tokens table and updating the used_token
        // access tokens can be revoked by the rabbitMQ event message 
            await tokens.destroy({
                where: {
                    userId: usedTokenCheck.userId
                }
            })
            usedTokenCheck.userBan = true;
            await usedTokenCheck.save();
            return res.send({
                message: 'Please re login with your accound'
            })
        // also tell the user to re login
        }
        return res.send({
            message: 'Please re login with your account'
        })
        
    }
}

module.exports = {
    refresh
}