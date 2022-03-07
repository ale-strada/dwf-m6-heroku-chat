import { state } from "../state";
import { Router } from "@vaadin/router";

class signUpPage extends HTMLElement {
  connectedCallback() {
    this.render();

    const form = this.querySelector(".sign-up-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      console.log(target.email.value);
      console.log(target.nombre.value);
      state.setEmailAndFullname(target.email.value, target.nombre.value);
      state.signUp(() => {
        state.singIn((err) => {
          if (err) console.log("hubo un error en el signIn");
          state.askNewRoom(() => {
            state.accessToRoom();
          });
        });
      });
      Router.go("/chat");
    });
  }
  render() {
    this.innerHTML = `
    <div class="conteiner">
     <titulo-comp>Sign Up</titulo-comp>
     <form class = "sign-up-form form">
      <div>
         <label class="label">email</label>
      </div>
      <input class="input" type="email" name = "email">
      <div>
         <label class="label">nombre</label>
      </div>
      <input class="input" type="text" name = "nombre">
      <button class="button">COMENZAR</button>
     </form>
    </div>
    </div>
       `;
    // this.connectedCallback();
  }
}

customElements.define("sign-up-page", signUpPage);
