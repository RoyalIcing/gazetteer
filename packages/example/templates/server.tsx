import React from "react";
import ReactDOM from "react-dom/server";

import { DataSourceResult, DataSourceIdentifier } from "../types";
import { Templates } from "../main";
import { Feed } from "./Feed/Feed";
import { EditAccount } from "./EditAccount/EditAccount";
import { DataSourceContext } from "../root/DataSourceContext";
import { UserProfile } from "./UserProfile/UserProfile";

export function renderTemplateHTML({
  id,
  type,
  resultForDataSource
}: {
  id: symbol;
  type: "react";
  resultForDataSource<Data>(
    identifier: DataSourceIdentifier
  ): DataSourceResult<Data>;
}): string | undefined {
  if (type === "react") {
    let el: React.ReactElement | undefined;
    if (id.toString() === Templates.Feed.toString()) {
      el = <Feed />;
    } else if (id.toString() === Templates.EditAccount.toString()) {
      el = <EditAccount />;
    } else if (id.toString() === Templates.UserProfile.toString()) {
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
