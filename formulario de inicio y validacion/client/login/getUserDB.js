const apiFetchUser = async () => {
  const apiResult = await fetch('http://localhost:3000/api/v1/users');

  const getDataFromFetchAPI = await apiResult.json();
  return getDataFromFetchAPI;
}

//TODO: Update
const datosValidos = async (identificadorDelUsuario, passwordInput) => {
  const apiResult = await fetch(`http://localhost:3000/api/v1/users/${identificadorDelUsuario}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: passwordInput
    })
  });

  const getDataFromFetchAPI = await apiResult.json();

  //console.log(getDataFromFetchAPI)

  return getDataFromFetchAPI;
}

//TODO: add
const apiFetchOneUser = async (id) => {
  const apiResult = await fetch(`http://localhost:3000/api/v1/users/${id}`);

  const getDataFromFetchAPI = await apiResult.json();

  return getDataFromFetchAPI;
}

export {
  apiFetchUser,
  datosValidos,
  apiFetchOneUser,
}