const db = require('./model.js');

//TODO: Change
async function getAllUsers() {
  const docRef = await db.collection('usuarios').get();

  return docRef.docs.map((cadaUnoDeLosUsuariosQueTengaEnLaBaseDeDatos) => {
    return {
      id: cadaUnoDeLosUsuariosQueTengaEnLaBaseDeDatos.id,
      cadaUsuario: cadaUnoDeLosUsuariosQueTengaEnLaBaseDeDatos.data()
    }
  })
}

async function getOnlyUser(id) {

  const getOnlyUser = await db.collection('usuarios').doc(`${id}`).get();
  return getOnlyUser.data();

}

async function createUser(user) {
  const docRef = db.collection('usuarios');
  return await docRef.add(user)
}

function updateUser(id, datosACambiar) {
  const userEncontrado = db.find(uid => uid.id === id ? uid : null)

  return userEncontrado.email = datosACambiar;
}

module.exports = {
  add: createUser,
  getOnly: getOnlyUser,
  list: getAllUsers,
  update: updateUser,
}