const { log } = console;
//const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'password123';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       log(hash);
//   })
// });

const hash = '$2a$10$GgK7VPDbfL3FskeO2bEKhOIisBvW1oUFAgM5g7fqjMOho6/9Mva86'

bcrypt.compare(password, hash, (err, res) => {
  log(res);
});

// const data = {
//   id: 10
// }
//
// const token = jwt.sign(data, '123acb');
// log(token);
//
// const decoded = jwt.verify(token, '123acb');
// log('decoded', decoded);
//


// const message = 'i am user number 3';
// const hash = SHA256(message).toString();
//
// log(`Message: ${message}`);
// log(`Hash: ${hash}`);
