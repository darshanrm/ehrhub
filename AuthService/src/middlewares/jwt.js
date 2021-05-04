const jose = require('node-jose');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

// JWKS (Key Set)
const keyStore = jose.JWK.createKeyStore();


/**
 * This function will generate all the keys
 */
const generateKeys = async () => {
    // JWS Signing Asymmetric Key Pair for accesToken Props
    // contains public and private key (1024 bit size)
    var signingKeyProps = {
        kid: uuidv4(),
        alg: 'RS256',
        use: 'sig'
    }

    // JWE Encryption Key Props
    // contains AES shared key
    var encryptionKeyProps = {
        kid: uuidv4(),
        alg: 'A128KW',
        use: 'enc'
    }

    // JWS Signing Symmetric Key for refreshToken Props
    // contains shared Octet Sequence key 
    var refreshSigningKeyProps = {
        kid: uuidv4,
        alg: 'HS256',
        use: 'sig'
    }

    // JWS Signing JWK
    await keyStore.generate("RSA", 1024, signingKeyProps);
    
    // JWE Encryption JWK
    await keyStore.generate("oct", 128, encryptionKeyProps);

    // JWS Refresh Signing JWK
    await keyStore.generate("oct", 256, refreshSigningKeyProps);
}

/**
 * Get the JWKS
 * This will only give the public keys
 */
const getKeySet = () => {
    let tempKeyStore = {
        keys: []
    }
    const signingKey = keyStore.get({ kty: 'RSA'});
    const encryptionKey = keyStore.get({ kty: 'oct', use: 'enc'})
    tempKeyStore.keys.push(signingKey.toJSON());
    tempKeyStore.keys.push(encryptionKey.toJSON(true));
    return tempKeyStore;
}

/**
 * Signing JWS using Private Key [RSA256]
 */
const signAccessToken = async (user) => {
    // Claims or Payload
    const claims = {
        user,
        exp: Math.round((new Date()).getTime() / 1000) + 9000,
        iat: Math.round((new Date()).getTime()),
        iss: 'Ehrhub Corporations (AuthService)',
        aud: 'Ehrhub Corporations',
        jti: uuidv4()
    }

    const signingKey = keyStore.get({ kty: 'RSA', use: 'sig' });
    try{
        const accessToken = await jose.JWS.createSign({ format: 'compact', alg: 'RS256'}, signingKey)
            .update(Buffer.from(JSON.stringify(claims))).final();
        return accessToken;
    }
    catch(err){
        logger.error(`JWS Creation Error | Signing new accessJWSToken`, err)
        return null;
    }
}

/**
 * Signing JWS RefreshToken using Symmetric Key
 */
const signRefreshToken = async () => {
    // Claims or Payload
    const claims = {
        exp: Math.round((new Date()).getTime() / 1000) + 2700,
        iat: Math.round((new Date()).getTime() / 1000),
        nbf: Math.round((new Date()).getTime() / 1000) + 900,
        iss: 'Ehrhub Corporations (AuthService)',
        aud: 'Ehrhub Corporations (AuthService)',
        jti: uuidv4()
    }
    const signingKey = keyStore.get({ kty: 'oct', use: 'sig'});
    try{
        const refreshToken = await jose.JWS.createSign({ format: 'compact'}, signingKey)
            .update(Buffer.from(JSON.stringify(claims))).final();
        return {
            refreshToken,
            jti: claims.jti,
            exp: claims.exp 
        }
    }
    catch(err) {
        logger.error(`JWS Creation Error | Signing new refreshToken`, err)
        return null;
    }
}

/**
 * Encrypting the AcessToken [JWE]
 */
const encryptAccessToken = async (accessToken) => {
    const encryptionKey = keyStore.get({ kty: 'oct', use: 'enc'});
    try{
        const encryptedToken = await jose.JWE.createEncrypt({ format: 'compact' }, encryptionKey)
            .update(accessToken).final();
        return encryptedToken;
    }
    catch(err){
        logger.error(`JWE Encryption Error | while encrypting accessToken`, err)
        return null;
    }
}

/**
 * Verify RefreshToken
 */
const verifyRefreshToken = async (refreshToken) => {
    try {
        const verifyResult = await jose.JWS.createVerify(keyStore).verify(refreshToken);
        return {
            result: {
                header: verifyResult.header,
                payload: JSON.parse(verifyResult.payload.toString()),
                key: verifyResult.key,
            }
        }
    }
    catch(err) {
        logger.error(`TokenVerificationError | Invalid Token`, err)
        return null;
    }
}

module.exports = {
    generateKeys,
    getKeySet,
    signAccessToken,
    signRefreshToken,
    encryptAccessToken,
    verifyRefreshToken
}