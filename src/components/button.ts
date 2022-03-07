export function initButton() {
  class ButtonComp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.textContent = `
        .button-container{
            max-width: 360px;
            margin: 20px auto;
            padding: 0px 20px;

        }
        .button{
            background-color: #9CBBE9;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
            line-height: 26px;
            text-align: center;
            color: #000000;
            width: 100%;
            text-align: center;
            height: 55px;
            border-radius: 4px;
            border: none;
}
        }
        `;
      var shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(style);

      var button = document.createElement("button");
      button.classList.add("button");
      button.textContent = textoOriginal;

      var div = document.createElement("div");
      div.classList.add("button-container");
      div.appendChild(button);

      shadow.appendChild(div);
    }
  }
  customElements.define("button-comp", ButtonComp);
}
