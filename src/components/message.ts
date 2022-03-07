import { state } from "../state";
export function initMessage() {
  class MessageComp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.textContent = `
          .messages{
           width: fit-content;
           display: flex;
           flex-direction: column;
           margin: 10px;
          }
          .message-from{
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #A5A5A5;
            padding: 5px;
          }
          .message-texto{
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            padding: 15px;
            background: #D8D8D8;
            border-radius: 4px;
          }
          .message-texto-local{
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            padding: 15px;
            background: #B9E97C;
            border-radius: 4px;
          }
          `;
      const cs = state.getState();
      var shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(style);

      var div = document.createElement("div");
      var from = document.createElement("div");
      var messageText = document.createElement("div");
      div.classList.add("messages");
      from.classList.add("message-from");
      messageText.classList.add("message-texto");
      const message = JSON.parse(textoOriginal);
      if (message.quien === cs.fullName) {
        div.innerHTML = `
        <div class="message-texto-local">${message.que}</div>
        `;
      } else {
        div.innerHTML = `
          <div class="message-from">${message.quien}</div>
          <div class="message-texto">${message.que}</div>
          `;
      }

      shadow.appendChild(div);
    }
  }
  customElements.define("message-comp", MessageComp);
}
