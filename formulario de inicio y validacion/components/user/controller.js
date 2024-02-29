const store = require('./store.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// CRUD = C = create, R = Read, U = Update, D = Delete

function addUser(user) {
  return new Promise((resolve, reject) => {
    if (!user.name || !user.email || !user.password) {
      return reject('Correo o contraseña inválidos');
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return console.error(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return console.error(err);

        console.log(hash);

        const newUser = {
          name: user.name,
          email: user.email,
          password: hash
        }

        store.add(newUser);
        resolve(newUser);
      })
    })

  })
}

function listUsers() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  })
}

//TODO: Change
function getOnlyUser(id) {
  return new Promise(async (resolve, reject) => {
    resolve(store.getOnly(id));
  })
}

//TODO: add
function postAuthenticate(id, passwordFromClient) {
  return new Promise(async (resolve, reject) => {
    if (!id) return reject('id not found')
    //const dataUserFromDB = await store.getOnly(id)
    const {
      password
    } = await store.getOnly(id);
    bcrypt.compare(passwordFromClient, password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return reject('Error al comparar contraseñas')
      }
      if (!isMatch) {
        return reject('Password is not correct!!');
      }

      resolve(isMatch)
    })
  })
}

function updateUserData(id, userData) {
  return new Promise((resolve, reject) => {
    if (!id || !userData) {
      return reject('El id es incorrecto o el correo');
    }

    resolve(store.update(id, userData));
  })
}

module.exports = {
  addUser,
  listUsers,
  getOnlyUser,
  postAuthenticate,
  updateUserData,
}