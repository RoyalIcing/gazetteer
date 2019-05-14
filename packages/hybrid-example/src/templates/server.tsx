import React from "react";
import ReactDOM from "react-dom/server";
import Vue from "vue";
import { createRenderer as createVueRenderer } from "vue-server-renderer";

import { DataSourceResult, DataSourceIdentifier, TemplateIdentifier } from "../types";
import { DataSourceContext } from "../root/react/DataSourceContext";
import { findTemplate } from "./registry";

export async function renderTemplateHTML({
  id,
  resultForDataSource
}: {
  id: TemplateIdentifier;
  resultForDataSource<Data>(
    identifier: DataSourceIdentifier
  ): DataSourceResult<Data>;
}): Promise<string | undefined> {
  const options = findTemplate(id.name);
  if (!options) {
    throw new Error(`Unknown template: ${id.name}`);
  }

  if (options.framework === "react") {
    const Component = options.component;
    const el = <Component />;

    return ReactDOM.renderToString(
      <DataSourceContext.Provider value={resultForDataSource}>
        {el || <div>Unknown template {id.toString()}</div>}
      </DataSourceContext.Provider>
    );
  } else if (options.framework === "vue") {
    const renderer = createVueRenderer();

    const Component = options.component;
    const app = new Vue({
      render: h => h(Component, {
        props: {
          resultForDataSource
        }
      })
    });

    return renderer.renderToString(app);
  }
}

export function htmlPage(headContent: string, bodyContent: string) {
  return `<!doctype html><html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${headContent}
</head>
<body>
${bodyContent}
</body>
</html>
`;
}
