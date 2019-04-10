import React, { useContext } from "react";

import { DataSourceResult, DataSourceIdentifier, dataSourceIdentifierToString } from "../types";

export const DataSourceContext = React.createContext(
  function<Data>(identifier: DataSourceIdentifier) {
    return { loaded: false } as DataSourceResult<Data>
  }
);

export function useDataSource<Data>(identifier: DataSourceIdentifier): DataSourceResult<Data> {
  const resultForDataSource = useContext(DataSourceContext);
  return resultForDataSource(identifier);
}

export function useRequiredDataSource<Data>(identifier: DataSourceIdentifier): Data {
  const result = useDataSource(identifier) as DataSourceResult<Data>;
  if (result.loaded && result.data != null) {
    return result.data;
  } else {
    if (result.loaded && result.error != null) {
      throw new Error(`Required data source ${dataSourceIdentifierToString(identifier)} error: ${result.error.message}`)
    }

    throw new Error(`Required data source ${dataSourceIdentifierToString(identifier)} not loaded`)
  }
}
