import React from "react";

import { DataSourceResult } from "../../types";
import { DataSources } from "../../main";
import { useDataSource } from "../../root/DataSourceContext";

type ViewerProfileData = {
  username: string;
}

export function EditAccount({}) {
  const viewProfileResult = useDataSource(
    DataSources.Viewer.profile
  ) as DataSourceResult<ViewerProfileData>;
  
  return <div>
    <h1>Edit Account</h1>
    {viewProfileResult.loaded && viewProfileResult.data && <>
      <h2>Username: {viewProfileResult.data.username}</h2>
    </>}
  </div>;
}