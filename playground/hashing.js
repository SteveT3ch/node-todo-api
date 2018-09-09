const { log } = console;
//const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
}

const token = jwt.sign(data, '123acb');
log(token);

const decoded = jwt.verify(token, '123acb');
log('decoded', decoded);



// const message = 'i am user number 3';
// const hash = SHA256(message).toString();
//
// log(`Message: ${message}`);
// log(`Hash: ${hash}`);
