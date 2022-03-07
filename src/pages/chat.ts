import { state } from "../state";
type Message = {
  from: string;
  message: string;
};
class Chatpage extends HTMLElement {
  messages: Message[] = [];

  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;
      this.render();
    });

    this.render();
  }

  addListenerts() {
    const form = this.querySelector(".submit-message");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const cs = state.getState();
      state.pushMessage(target["new-message"].value);
    });
  }
  render() {
    const cs = state.getState();
    this.innerHTML = `
    <style class="select-style" type="text/css">
    .messages {
      display: flex;
      flex-direction: column;
      margin: 20px;
     }
     .message-comp{
      align-self: end;
     }

   </style>
    <titulo-comp>Chat</titulo-comp>
    <h3 class="titulo label">${"room id:" + cs.roomId}</h3>
    <div>
     <div class="messages">
        ${this.messages
          .map((m) => {
            const message = {
              quien: m.from,
              que: m.message,
            };
            let messageClass = "";
            if (message.quien === cs.fullName) {
              messageClass = "message-comp";
            }
            return `<message-comp class= ${messageClass}>
            ${JSON.stringify(message)}
              </message-comp>`;
          })
          .join("")}
     </div>
     </div>

     <div>
     <form class="submit-message form">
        <input class="input" type="text" name ="new-message">
        <button class="button">Enviar</button>
     </form>
    </div>
       `;
    this.addListenerts();
  }
}

customElements.define("chat-page", Chatpage);
