const express = require('express');
const router = express.Router();
const users = require('../components/user/router.js');

function myAPI(application) {
  application.use('/api/v1', router);
  router.use('/users', users);
}

module.exports = myAPI;