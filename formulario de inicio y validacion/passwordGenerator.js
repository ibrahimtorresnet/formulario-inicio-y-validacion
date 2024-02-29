// requerir paquetes desde node_modules
const bcrypt = require('bcrypt');
const saltRounds = 10;
let userName = 'juancodev';
let password = 'holamundo';

console.log(`password without encrypt: ${password}`);


// encriptar password
bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(password, salt, function (err, hash) {
    bcrypt.compare(password, hash, function (err, res) {
      res ? console.log('password correcta') : console.error('password incorrecta');
    })
  })
})