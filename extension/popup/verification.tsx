import { proxyStoreWithMiddleWare } from "@store/proxyStore";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Verification from "@components/Verification/Verification";
import { Buffer } from "buffer";
import "virtual:windi.css";

window.global = window;
global.Buffer = Buffer;
proxyStoreWithMiddleWare.ready(() => {
  ReactDOM.render(
    <Provider store={proxyStoreWithMiddleWare}>
      <Verification />
    </Provider>,
    document.getElementById("root")
  );
});
