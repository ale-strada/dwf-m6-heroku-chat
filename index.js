"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var express = require("express");
// import { json } from "body-parser";
var nanoid_1 = require("nanoid");
var cors = require("cors");
var port = process.env.PORT || 3100;
var app = express();
app.use(express.json());
app.use(cors());
var userCollection = db_1.baseDeDatos.collection("users");
var roomsCollection = db_1.baseDeDatos.collection("rooms");
app.post("/messages/:rtdbRoomId", function (req, res) {
    var rtdbRoomId = req.body.rtdbRoomId;
    var chatRoomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/messages");
    chatRoomRef.push(req.body, function (err) {
        res.json("todo ok");
    });
});
app.post("/singup", function (req, res) {
    var email = req.body.email;
    var nombre = req.body.nombre;
    userCollection
        .where("email", "==", email)
        .get()
        .then(function (searchResponse) {
        if (searchResponse.empty) {
            userCollection
                .add({
                email: email,
                nombre: nombre
            })
                .then(function (newUserRef) {
                res.json({
                    id: newUserRef.id,
                    "new": true
                });
            });
        }
        else {
            res.status(400).json({
                message: "user already exist",
                id: searchResponse.docs[0].id
            });
        }
    });
});
app.post("/auth", function (req, res) {
    var email = req.body.email;
    userCollection
        .where("email", "==", email)
        .get()
        .then(function (searchResponse) {
        if (searchResponse.empty) {
            res.status(404).json({
                message: "not found"
            });
        }
        else {
            res.json({
                id: searchResponse.docs[0].id
            });
        }
    });
});
app.post("/rooms", function (req, res) {
    var userId = req.body.userId;
    userCollection
        .doc(userId.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            var roomRef_1 = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomRef_1
                .set({
                messages: [],
                owner: userId
            })
                .then(function () {
                var roomLongId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection
                    .doc(roomId.toString())
                    .set({
                    rtdbRoomId: roomLongId
                })
                    .then(function () {
                    res.json({
                        id: roomId.toString()
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.get("/rooms/:roomId", function (req, res) {
    var userId = req.query.userId;
    var roomId = req.params.roomId;
    userCollection
        .doc(userId.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            roomsCollection
                .doc(roomId)
                .get()
                .then(function (snap) {
                var data = snap.data();
                res.json(data);
            });
        }
        else {
            res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
