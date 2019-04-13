import React from "react";
import ReactDOM from "react-dom/server";

import { DataSourceResult, DataSourceIdentifier, TemplateIdentifier } from "../types";
import { Templates } from "../main";
import { Feed } from "./Feed/Feed";
import { EditAccount } from "./EditAccount/EditAccount";
import { DataSourceContext } from "../root/DataSourceContext";
import { UserProfile } from "./UserProfile/UserProfile";

export function renderTemplateHTML({
  id,
  resultForDataSource
}: {
  id: TemplateIdentifier;
  resultForDataSource<Data>(
    identifier: DataSourceIdentifier
  ): DataSourceResult<Data>;
}): string | undefined {
  if (id.framework === "react") {
    let el: React.ReactElement | undefined;
    if (id === Templates.Feed) {
      el = <Feed />;
    } else if (id === Templates.EditAccount) {
      el = <EditAccount />;
    } else if (id === Templates.UserProfile) {
      el = <UserProfile />;
    }

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
