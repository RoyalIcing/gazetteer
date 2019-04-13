import React from "react";

import { DataSources } from "../../main";
import { useRequiredDataSource } from "../../root/DataSourceContext";

export function UserProfile({}) {
  const username: string = useRequiredDataSource(DataSources.URLParams.username);
  
  return <div>
    <h1>{username}</h1>
  </div>;
}