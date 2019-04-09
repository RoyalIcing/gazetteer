import ReactDOM from "react-dom";
import { App } from "./root/App";

const shouldHydrate = false;

const el = document.querySelector("#root");
ReactDOM.render(<App />, el);
