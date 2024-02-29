const admin = require('firebase-admin');
const database = require('../../db/index.js');
const {
  getFirestore
} = require('firebase-admin/firestore');

const db = getFirestore(admin.apps[database]);

module.exports = db;