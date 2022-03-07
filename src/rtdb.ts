import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "nC9IFKgM3vCgy3RBez3wQA7IBxlvpGZ3D9qH0Qot",
  databaseURL: "https://dwf-m6-ale-default-rtdb.firebaseio.com",
  projectId: "dwf-m6-ale",
  authDomain: "dwf-m6-ale.firebaseapp.com",
  storageBucket: "dwf-m6-ale.appspot.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const rtdb = getDatabase();

export { rtdb, ref, onValue };
