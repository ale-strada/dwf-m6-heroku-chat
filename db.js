"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.baseDeDatos = void 0;
const admin = require("firebase-admin");
// import { firestore } from "firebase-admin";
const serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dwf-m6-ale-default-rtdb.firebaseio.com",
});
const baseDeDatos = admin.firestore();
exports.baseDeDatos = baseDeDatos;
const rtdb = admin.database();
exports.rtdb = rtdb;
