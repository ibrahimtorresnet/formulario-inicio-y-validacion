try {
  console.log('Hola mundo!');

  console.log(hola);

  setInterval(() => {
    console.log('Soy un intervalo de tiempo')
  }, 5000)

  console.log('Soy un programador feliz aprendiendo node')
} catch (e) {
  console.log(`hubo un error y el error es: ${e.message}`);
}

/* creen que la salida va a ser esto?
1
hola mundo,
Soy un intervalo de tiempo
Soy un programador feliz aprendiendo node

2
otra

hola mundo,
Soy un programador feliz aprendiendo node
Soy un intervalo de tiempo

3
hola mundo,
Soy un intervalo de tiempo
* */