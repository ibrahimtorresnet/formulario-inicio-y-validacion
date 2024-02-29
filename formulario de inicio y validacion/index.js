const express = require('express');
const path = require('path');
const myAPI = require('./router/index.js');

let swaggerUI = require('swagger-ui-express');
let swaggerJsdoc = require('swagger-jsdoc');

let swaggerSpec = {
 definition: {
    openapi: "3.0.0",
    info: {
      title: "node firebase API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
 },
 apis: [path.join(__dirname, './components/user/router.js')]
};

const app = express();

app.use(express.json());

myAPI(app);

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerSpec)));

// carpeta client/home
app.use('/', express.static(path.resolve(__dirname, 'client', 'home')));

// carpeta client/login
app.use('/login', express.static(path.resolve(__dirname, 'client', 'login')));

//carpeta client/register
app.use('/register', express.static(path.resolve(__dirname, 'client', 'register')));

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
