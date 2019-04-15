import React from "react";
import ReactDOM from "react-dom";

export function renderReactComponentInBrowser(Component: React.ComponentType) {
  ReactDOM.render(<Component />, document.getElementById("root"));
}
