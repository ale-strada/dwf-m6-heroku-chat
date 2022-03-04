"use strict";
exports.__esModule = true;
exports.rtdb = exports.baseDeDatos = void 0;
var admin = require("firebase-admin");
// import { firestore } from "firebase-admin";
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dwf-m6-ale-default-rtdb.firebaseio.com"
});
var baseDeDatos = admin.firestore();
exports.baseDeDatos = baseDeDatos;
var rtdb = admin.database();
exports.rtdb = rtdb;
