const API_BASE_URL = "";
import { rtdb, ref, onValue } from "./rtdb";
import map from "lodash/map";
// import { json } from "stream/consumers";

type Message = {
  from: string;
  message: string;
};

const state = {
  data: {
    fullName: "",
    email: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    messages: [],
  },
  listeners: [],
  init() {
    const lastStorageState = localStorage.getItem("state");
    const cs = this.getState();
    // state.setState(JSON.parse(lastStorageState));
  },
  listenRoom() {
    // console.log("listenroom");

    const cs = this.getState();
    const mensajeRef = ref(rtdb, "/rooms/" + cs.rtdbRoomId);

    onValue(mensajeRef, (snapshot) => {
      const currentState = this.getState();
      const messagesFromServer = snapshot.val();
      // console.log(messagesFromServer);

      const messagesList = map(messagesFromServer.messages);

      currentState.messages = messagesList;
      this.setState(currentState);
    });
  },
  getState() {
    return this.data;
  },
  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },
  setEmail(email: string) {
    const currentState = this.getState();
    currentState.email = email;
    this.setState(currentState);
  },
  pushMessage(message: string) {
    const cs = state.getState();
    const nombreDelState = this.data.fullName;
    fetch(API_BASE_URL + "/messages/:rtdbRoomId", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreDelState,
        message: message,
        rtdbRoomId: cs.rtdbRoomId,
      }),
    });
  },
  setEmailAndFullname(email: string, fullName: string) {
    const cs = this.getState();

    cs.fullName = fullName;
    cs.email = email;

    this.setState(cs);
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("soy el state, he cambiado", this.getState());
  },
  signUp(callback?) {
    const cs = this.getState();
    if (cs.email) {
      fetch(API_BASE_URL + "/singup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
          nombre: cs.fullName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un mail en el state");
      callback(true);
    }
  },
  singIn(callback?) {
    const cs = this.getState();
    if (cs.email) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: cs.email }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un mail en el state");
      callback(true);
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      // console.log(cs.userId);
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("no hay user id");
    }
  },
  accessToRoom(callback?) {
    const cs = this.getState();
    const roomId = this.roomId;
    fetch(API_BASE_URL + "/rooms/" + cs.roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenRoom();
        if (callback) {
          callback();
        }
      });
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };
