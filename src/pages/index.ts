import { Router } from "@vaadin/router";
import { state } from "../state";
class Home extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = this.querySelector(".ingreso");
    const singUp = this.querySelector(".button-sign-up");
    const displayRoom = "none";
    singUp.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/signUp");
    });

    const selectRoom = this.querySelector(".select-room");

    var style = document.createElement("style");
    style.textContent = `
        .select-room-id {
         display: none;
        }
        `;

    selectRoom.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target as any;
      if (target.value == "existing-room") {
        const selectRoomId = this.querySelector(".select-style");
        selectRoomId.textContent = `
        .select-room-id {
         display:inherit;
        }
        `;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cs = state.getState();
      const target = e.target as any;
      state.setEmailAndFullname(target.email.value, target.nombre.value);

      if (target.RoomId.value == 0) {
        state.singIn((err) => {
          if (err) console.log("hubo un error en el signIn");
          state.askNewRoom(() => {
            state.accessToRoom(() => {
              state.listenRoom();
            });
          });
        });
      } else {
        const cs = state.getState();
        cs.roomId = target.RoomId.value;
        state.setState(cs);
        state.singIn((err) => {
          state.accessToRoom(() => {
            state.listenRoom();
          });
        });
      }

      Router.go("/chat");
    });
  }
  render() {
    this.innerHTML = `
    <style class="select-style" type="text/css">
    .select-room-id {
      display:none;
     }
     .select-room{
      display: flex;
      margin: 10px;
     }
     .titulo-sign-up{
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: #000000;
      margin: 20px;
     }
  
   </style>
    <titulo-comp>Bienvenidx</titulo-comp>
    <div class="conteiner">
    <form class = "ingreso form">
     <div>
        <label class="label">email</label>
     </div>
     <input class="input" type="email" name = "email">
     <div>
        <label class="label">nombre</label>
     </div>
     <input class="input" type="text" name = "nombre">
     <div>
     <select class="select-room" name="select">
     <option value="new-room">nueva room</option>
     <option value="existing-room">room existente</option>
     </select>
     <div class = "select-room-id">
     <div>
     <label class="label">Room Id</label>
      </div>
      <input class="input" type="number" name = "RoomId">
     </div>
     <button class="button">COMENZAR</button>
    </form>
    </div>

    <div class="conteiner">
    <h3 class="titulo-sign-up">crea tu cuenta</h3>
    <button class="button-sign-up button">Sign Up</button>
    </div>
    `;
  }
}

customElements.define("home-page", Home);
