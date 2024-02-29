const form = document.getElementById('form');
import {
  apiFetchUser,
  datosValidos,
  apiFetchOneUser
} from './getUserDB.js';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  //TODO: Change
  apiFetchUser()
    .then((listaDeUsuarios) => {
      let user = listaDeUsuarios.find(userEmail => {
        if (userEmail.cadaUsuario.email === data.email) {
          return userEmail.cadaUsuario;
        }
      })
      console.log(user);
      if (user === undefined) return alert('Correo no registrado!!');

      datosValidos(user.id, data.password)
        .then((response) => {
          const {
            message,
            error
          } = response;
          if (message) return alert('bienvenido');
          if (error) return alert(error)
        })
        .catch(err => alert(err));

    })
    .catch(err => console.error(err));



  // const dataGetLocalStorage = window.localStorage.getItem('user');

  // const convertDataGetLocalStorage = JSON.parse(dataGetLocalStorage);

  // if (convertDataGetLocalStorage.email === data.email && convertDataGetLocalStorage.password === data.password) {
  //   window.location.pathname = '/';
  // } else {
  //   alert('Email or password is incorrect');
  // }


})

