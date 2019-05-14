import React from "react";
import ReactDOM from "react-dom";
import Vue from "vue";
import { findTemplate } from "./registry";
import { DataSourceContext } from "../root/react/DataSourceContext";
import {
  DataSourceIdentifier,
  DataSourceResult,
  dataSourceIdentifierToString
} from "../types";

function resultForDataSource<Data>(
  identifier: DataSourceIdentifier
): DataSourceResult<Data> {
  console.log("resultForDataSource", identifier);
  const dataSourcesInitialEl = document.getElementById("dataSourcesInitial");
  if (!dataSourcesInitialEl) {
    return { loaded: false };
  }

  const identifierEncodedToFind = dataSourceIdentifierToString(identifier);

  const initialData = JSON.parse(dataSourcesInitialEl.textContent || "") as Array<{ identifierEncoded: string; data: any; loaded: true }>;

  const found = Array.isArray(initialData) ? initialData.find(item => item.identifierEncoded === identifierEncodedToFind) : null;
  if (found == null) {
    return { loaded: false };
  }

  return { loaded: true, data: found.data };
}

export function activateTemplate(name: string) {
  const options = findTemplate(name);
  if (!options) {
    throw new Error(`Unknown template: ${name}`);
  }

  if (options.framework === "react") {
    const Component = options.component;
    ReactDOM.render(
      <DataSourceContext.Provider value={resultForDataSource}>
        <Component />
      </DataSourceContext.Provider>,
      document.getElementById("root")
    );
  } else if (options.framework === "vue") {
    const Component = options.component;

    const app = new Vue({
      render: h => h(Component, {
        props: {
          resultForDataSource
        }
      })
    });

    app.$mount("#root");
  }
}

if (typeof window !== "undefined") {
  (window as any).activateTemplate = activateTemplate;
}
