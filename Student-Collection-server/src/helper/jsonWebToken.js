const jwt = require('jsonwebtoken');

const createJsonWebToken = (payload, secretKey, expiresIn) => {
    if (typeof payload !== 'object' || !payload) {
        throw new Error('PayLoad Must be a non-Empty Object')
    }
    if (typeof secretKey !== 'string' || secretKey == '') {
        throw new Error('Secret key Must be a non-Empty String')
    }
    try {
        const createdToken = jwt.sign(payload, secretKey, { expiresIn })
        return createdToken

    } catch (error) {
        console.error('Failed to sign the JWT',error);
        throw error;
    }
}

module.exports = {
    createJsonWebToken,

}