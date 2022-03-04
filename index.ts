import { baseDeDatos, rtdb } from "./db";
import * as express from "express";
// import { json } from "body-parser";
import { nanoid } from "nanoid";
import * as cors from "cors";

const port = process.env.PORT || 3100;
const app = express();

app.use(express.json());
app.use(cors());

const userCollection = baseDeDatos.collection("users");
const roomsCollection = baseDeDatos.collection("rooms");

app.get("/hola", (req, res) => {
  res.json({
    message: "hola soy el servidor",
  });
});

app.post("/messages/:rtdbRoomId", function (req, res) {
  var rtdbRoomId = req.body.rtdbRoomId;
  const chatRoomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/messages");
  chatRoomRef.push(req.body, function (err) {
    res.json("todo ok");
  });
});

app.post("/singup", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  userCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        userCollection
          .add({
            email,
            nombre,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
              new: true,
            });
          });
      } else {
        res.status(400).json({
          message: "user already exist",
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.post("/auth", (req, res) => {
  const { email } = req.body;
  userCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        res.status(404).json({
          message: "not found",
        });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            messages: [],
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);

            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
