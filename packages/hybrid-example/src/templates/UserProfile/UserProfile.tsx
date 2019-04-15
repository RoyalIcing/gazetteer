import React from "react";

import { Templates, DataSources } from "../../main";
import { useRequiredDataSource } from "../../root/DataSourceContext";
import { registerTemplate } from "../registry";

export function UserProfile({}) {
  const username: string = useRequiredDataSource(
    DataSources.URLParams.username
  );

  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

registerTemplate({
  ...Templates.UserProfile,
  component: UserProfile
});
