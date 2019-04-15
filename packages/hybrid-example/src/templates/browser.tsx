import React from "react";
import ReactDOM from "react-dom";
import { findTemplate } from "./registry";

export function activateTemplate(name: string) {
  const options = findTemplate(name);
  if (!options) {
    throw new Error(`Unknown template: ${name}`);
  }

  if (options.framework === "react") {
    const Component = options.component;
    ReactDOM.render(<Component />, document.getElementById("root"));
  }
}

if (typeof window !== "undefined") {
  (window as any).activateTemplate = activateTemplate;
}
