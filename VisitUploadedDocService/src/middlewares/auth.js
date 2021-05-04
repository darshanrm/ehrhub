const jose = require('node-jose');
const logger = require('./logger');
const axios = require('axios');

var keyStore = jose.JWK.createKeyStore();

const getKeySet = async () => {
  try{
    const { data }= await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/keys`);
    const result = await jose.JWK.asKeyStore(data)
    keyStore = result;
  } catch(error) {
    logger.error(`GET | Key Error`, error)
  }
  logger.info(`GET Keyset successfull`);
  showKey();
}

const getNewKeySet = async (data) => {
    const result = await jose.JWK.asKeyStore(data);
    keyStore = result;
    showKey();
}
const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  try{
    const decryptionKey = keyStore.get({ kty: 'oct', use: 'enc'});
    const decrypting = await jose.JWE.createDecrypt(decryptionKey).decrypt(token);
    const decryptedToken = decrypting.plaintext.toString();
    const accessToken = await jose.JWS.createVerify(keyStore).verify(decryptedToken);
    req.user = JSON.parse(accessToken.payload.toString()).user;
    next();
  } catch(error){
    req.send("Authentication Error")
    logger.error(`Authentication error`, error);
  }
  
}

const showKey = () => {
  console.log(keyStore.toJSON(true))
}

module.exports = {
  getKeySet,
  getNewKeySet,
  authenticate
}