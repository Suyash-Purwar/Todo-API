const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')

const data = {
    id: 17
};

// There are three parts of JSON Web Tokens - Header, Payload and Hash

const token = jwt.sign(data, '123abc');
console.log('Encoded: ', token);

const decodedData = jwt.verify(token, '123abc');
console.log('Decoded: ', decodedData);

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log('Message: ' + message);
// console.log('Hash: ' + hash);