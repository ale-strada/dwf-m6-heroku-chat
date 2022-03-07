export function initTitle() {
  class TitleComp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.textContent = `
        .title{
            font-family: "Roboto";
            font-size: 52px;
            font-weight: bold;
            font-style: normal;
            line-height: 61px;
            max-width: 600px;
            margin: 20px auto;
            text-align: center;
            padding: 0px 20px;
            color: #000000;
        }
        `;

      var shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(style);

      var h1 = document.createElement("h1");
      h1.classList.add("title");
      h1.textContent = textoOriginal;
      shadow.appendChild(h1);
    }
  }
  customElements.define("titulo-comp", TitleComp);
}
