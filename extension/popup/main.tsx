import ReactDOM from "react-dom";
import "./index.css";
import "virtual:windi.css";
import App from "@/components/App/App";
import { proxyStoreWithMiddleWare } from "@/core/redux/proxyStore";
import { Provider } from "react-redux";
import "tw-elements";
import { Buffer } from "buffer";

window.global = window;
global.Buffer = Buffer;

proxyStoreWithMiddleWare.ready(() => {
  ReactDOM.render(
    <Provider store={proxyStoreWithMiddleWare}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
