import "./pages/index";
import "./pages/chat";
import "./pages/signUp";
import "./router";
import { state } from "./state";
import { initTitle } from "./components/titulo";
import { initMessage } from "./components/message";
import { initButton } from "./components/button";

(function () {
  state.init();
  initTitle();
  initMessage();
  initButton();
})();
