import React from "react";
import ReactDOM from "react-dom/server";

import { DataSourceResult, DataSourceIdentifier, TemplateIdentifier } from "../types";
import { DataSourceContext } from "../root/DataSourceContext";
import { findTemplate } from "./registry";

export function renderTemplateHTML({
  id,
  resultForDataSource
}: {
  id: TemplateIdentifier;
  resultForDataSource<Data>(
    identifier: DataSourceIdentifier
  ): DataSourceResult<Data>;
}): string | undefined {
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
